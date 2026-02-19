import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const AdminRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    // If not logged in, redirect to Admin Login
    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    // If logged in but not admin, redirect to User Dashboard
    if (user.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    // If authorized, render child routes
    return <Outlet />;
};

export default AdminRoute;
