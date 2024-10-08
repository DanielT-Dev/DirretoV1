import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Assuming this is the path to your AuthContext

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth(); // Get the current user from the context

    console.log(user);

    if(isLoading) return <div>Loading...</div>

    if (user === null) {
        // If no user is authenticated, redirect to login
        return <Navigate to="/log-in" />;
    }

    // If user is authenticated, render the child components
    return children;
};

export default ProtectedRoute;
