import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const PrivateRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    // If not logged in, redirect to User Login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If authorized, render child routes
    return <Outlet />;
};

export default PrivateRoute;
