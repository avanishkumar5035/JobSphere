import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import authService from '../features/auth/authService';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Smartphone, CheckCircle, AlertCircle, LogOut } from 'lucide-react';

const MobileVerificationPage = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [step, setStep] = useState('initial'); // 'initial' | 'sending' | 'verify' | 'verifying' | 'success'
    const [otp, setOtp] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
    const [isEditingPhone, setIsEditingPhone] = useState(!user?.phone);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (user.mobileVerified) {
            navigate(user.role === 'employer' ? '/dashboard/employer' : '/dashboard');
        }
    }, [user, navigate]);

    const handleSendOtp = async () => {
        setError('');
        setMessage('');
        setStep('sending');
        try {
            if (!phoneNumber) {
                setError('Please provide a phone number.');
                setStep('initial');
                return;
            }
            // Basic validation for 10 digit Indian number
            const cleanPhone = phoneNumber.replace(/\D/g, '').slice(-10);
            if (cleanPhone.length !== 10) {
                setError('Please enter a valid 10-digit mobile number.');
                setStep('initial');
                return;
            }

            const res = await authService.sendMobileOtp(phoneNumber, user.token);
            if (res.success) {
                setMessage(res.message);
                setStep('verify');
                setIsEditingPhone(false);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
            setStep('initial');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setStep('verifying');
        try {
            const res = await authService.verifyMobileOtp(otp, user.token);
            if (res.success) {
                // Update local status and phone (in case it was changed)
                const updatedUser = { ...user, mobileVerified: true, phone: phoneNumber };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                // We might need a small hack to update the context if we don't have a reload
                // but for now redirecting will work if the next page reads from localStorage
                setStep('success');
                setTimeout(() => {
                    window.location.reload(); // Refresh to update AuthContext state
                }, 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid or expired OTP');
            setStep('verify');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full shadow-lg border-gray-200">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto w-12 h-12 bg-blue-100 text-accent rounded-full flex items-center justify-center mb-4">
                        <Smartphone className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Mobile Verification</CardTitle>
                    <p className="text-sm text-gray-500 mt-2">
                        To keep your account secure, we need to verify your local mobile number.
                    </p>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                    {message && step !== 'success' && (
                        <div className="p-3 bg-green-50 border border-green-100 text-green-700 text-sm rounded-lg flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>{message}</span>
                        </div>
                    )}

                    {step === 'initial' && (
                        <div className="space-y-4">
                            {isEditingPhone ? (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                                    <Input
                                        type="tel"
                                        placeholder="e.g. 9876543210"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        icon={Smartphone}
                                    />
                                    <p className="text-xs text-gray-500">Enter your 10-digit mobile number</p>
                                </div>
                            ) : (
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <p className="text-sm text-gray-500 text-center">We will send a code to:</p>
                                    <p className="text-lg font-semibold text-gray-900 text-center mt-1">{phoneNumber}</p>
                                    <button
                                        onClick={() => setIsEditingPhone(true)}
                                        className="text-xs text-accent hover:underline block mx-auto mt-2"
                                    >
                                        Change number
                                    </button>
                                </div>
                            )}
                            <Button
                                onClick={handleSendOtp}
                                className="w-full"
                                isLoading={step === 'sending'}
                                disabled={!phoneNumber || (phoneNumber === user?.phone && !isEditingPhone && step === 'sending')}
                            >
                                Get Verification Code
                            </Button>
                        </div>
                    )}

                    {step === 'sending' && (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
                            <p className="text-gray-600">Sending OTP...</p>
                        </div>
                    )}

                    {step === 'verify' && (
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Enter 6-digit OTP Code</label>
                                <Input
                                    type="text"
                                    maxLength="6"
                                    placeholder="000000"
                                    className="text-center text-2xl tracking-[0.5em] font-bold h-14"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    required
                                    autoFocus
                                />
                            </div>
                            <Button type="submit" className="w-full h-12 text-lg">
                                Verify & Continue
                            </Button>
                            <button
                                type="button"
                                onClick={() => setStep('initial')}
                                className="w-full text-sm text-accent hover:underline"
                            >
                                Re-send text message
                            </button>
                        </form>
                    )}

                    {step === 'verifying' && (
                        <div className="flex flex-col items-center py-8 space-y-4">
                            <div className="h-8 w-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-500 text-sm">Verifying code...</p>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="flex flex-col items-center py-6 text-center space-y-3">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce">
                                <CheckCircle className="h-10 w-10" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Success!</h3>
                            <p className="text-gray-500">Your phone number is verified. Redirecting you now...</p>
                        </div>
                    )}

                    <div className="pt-4 border-t border-gray-100">
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 w-full py-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
                        >
                            <LogOut className="h-4 w-4" /> Sign out
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MobileVerificationPage;
