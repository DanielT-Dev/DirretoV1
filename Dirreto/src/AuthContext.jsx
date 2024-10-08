import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from './lib/appwrite'; // Adjust the import path

// Create AuthContext
const AuthContext = createContext();

// AuthProvider to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check for user session from Appwrite
    useEffect(() => {
        const fetchUserSession = async () => {
            try {
                // Get the current user from Appwrite
                const currentUser = await account.get();
                setUser(currentUser);
            } catch (error) {
                console.error("No user session found:", error);
                // Handle the error or set user to null if no session
                setUser(null);
            }
        };

        fetchUserSession();
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            // Delete the current session from Appwrite
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
