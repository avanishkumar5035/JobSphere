import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Mail, Key, Lock, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const API_URL = `${API_BASE_URL}/api/auth`;
    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await axios.post(`${API_URL}/forgot-password`, { email });
            if (res.data.success) {
                setMessage(res.data.message);
                setStep(2);
            } else {
                setError(res.data.message || 'Failed to send OTP');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await axios.post(`${API_URL}/verify-otp`, { email, otp });
            if (res.data.success) {
                setMessage(res.data.message);
                setStep(3);
            } else {
                setError(res.data.message || 'Invalid or expired OTP');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid or expired OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await axios.put(`${API_URL}/reset-password`, { email, otp, password });
            if (res.data.success) {
                setMessage(res.data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(res.data.message || 'Failed to reset password');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Reset Password</h2>
                </div>

                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>
                            {step === 1 && 'Step 1: Get OTP'}
                            {step === 2 && 'Step 2: Verify OTP'}
                            {step === 3 && 'Step 3: New Password'}
                        </CardTitle>
                        <CardDescription>
                            {step === 1 && 'Enter your email address to receive a 6-digit OTP.'}
                            {step === 2 && `Enter the OTP sent to ${email}`}
                            {step === 3 && 'Choose a strong, new password.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm text-center">
                                {error}
                            </div>
                        )}
                        {message && (
                            <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded text-sm text-center">
                                {message}
                            </div>
                        )}

                        {step === 1 && (
                            <form className="space-y-6" onSubmit={handleSendOTP}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                    <Input
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        icon={Mail}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="off"
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Sending...' : 'Send OTP'}
                                </Button>
                            </form>
                        )}

                        {step === 2 && (
                            <form className="space-y-6" onSubmit={handleVerifyOTP}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">6-Digit OTP</label>
                                    <Input
                                        type="text"
                                        required
                                        placeholder="123456"
                                        icon={Key}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        maxLength={6}
                                        autoComplete="off"
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Verifying...' : 'Verify OTP'}
                                </Button>
                                <div className="text-center mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-sm text-accent hover:underline flex items-center justify-center gap-1 w-full"
                                    >
                                        <ArrowLeft className="h-4 w-4" /> Back to Email
                                    </button>
                                </div>
                            </form>
                        )}

                        {step === 3 && (
                            <form className="space-y-6" onSubmit={handleResetPassword}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                    <Input
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        icon={Lock}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="new-password"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                    <Input
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        icon={Lock}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        autoComplete="new-password"
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Resetting...' : 'Reset Password'}
                                </Button>
                            </form>
                        )}

                        {step === 1 && (
                            <div className="mt-6 text-center text-sm">
                                <Link to="/login" className="font-medium text-accent hover:text-blue-500 flex items-center justify-center gap-1">
                                    <ArrowLeft className="h-4 w-4" /> Back to login
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ForgotPassword;
