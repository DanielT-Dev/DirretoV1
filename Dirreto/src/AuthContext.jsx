import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from './lib/appwrite'; // Adjust the path

// Create AuthContext
const AuthContext = createContext();

// AuthProvider to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for user session from Appwrite on initial load
    useEffect(() => {
        const fetchUserSession = async () => {
            try {
                const currentUser = await account.get(); // Fetch user session from Appwrite
                setUser(currentUser); // Update user state
                setIsLoading(false);
                console.log("User session found:", currentUser); // Debug log
            } catch (error) {
                console.error("No active user session found:", error); // Log session errors
                setUser(null); // No active session
                setIsLoading(false);
            }
        };

        fetchUserSession();
    }, []); // Run once on mount

    const login = (userData) => {
        setUser(userData); // Update user state in context
        console.log("User logged in:", userData); // Debug log
    };

    const logout = async () => {
        try {
            await account.deleteSession('current'); // Delete current session in Appwrite
            setUser(null); // Clear user state in context
            console.log("User logged out."); // Debug log
        } catch (error) {
            console.error("Error logging out:", error); // Log logout errors
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
