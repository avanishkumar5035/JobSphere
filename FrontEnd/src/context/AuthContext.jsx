import { createContext, useState, useEffect } from "react";
import authService from "../features/auth/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const userData = await authService.login({ email, password });
            setUser(userData);
            return { success: true, user: userData };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (name, email, password, role, phone) => {
        try {
            const userData = await authService.register({ name, email, password, role, phone });
            setUser(userData);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const updateUser = (updatedUserData) => {
        const newUser = { ...user, ...updatedUserData };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    const updateProfile = async (profileData) => {
        try {
            const updatedUser = await authService.updateProfile(profileData, user.token);
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser)); // authService.updateProfile already does this, but being redundant for safety
            return { success: true, user: updatedUser };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Profile update failed' };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateUser, updateProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
