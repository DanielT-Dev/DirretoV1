import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Assuming this is the path to your AuthContext

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth(); // Get the current user from the context

    if (!user) {
        // If no user is authenticated, redirect to login
        return <Navigate to="/log-in" />;
    }

    // If user is authenticated, render the child components
    return children;
};

export default ProtectedRoute;
