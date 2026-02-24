import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const PrivateRoute = () => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    // If not logged in, redirect to User Login
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Force mobile verification for seekers/employers if not yet verified
    // Exclude admins and the verification page itself to avoid infinite loops
    if (user.role !== 'admin' && !user.mobileVerified && location.pathname !== '/verify-mobile') {
        return <Navigate to="/verify-mobile" replace />;
    }

    // If authorized, render child routes
    return <Outlet />;
};

export default PrivateRoute;
