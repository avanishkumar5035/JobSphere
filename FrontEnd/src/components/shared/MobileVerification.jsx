import React, { useState, useContext } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Phone, CheckCircle, Smartphone } from 'lucide-react';
import authService from '../../features/auth/authService';
import AuthContext from '../../context/AuthContext';

const MobileVerification = () => {
    const { user } = useContext(AuthContext);
    const [step, setStep] = useState('initial'); // 'initial' | 'sending' | 'verify' | 'verifying' | 'success'
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // If verified, do not show, but we can also handle it differently in the parent
    if (user?.mobileVerified) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                    <h4 className="font-medium text-green-800">Mobile Verified</h4>
                    <p className="text-sm text-green-600">Your phone number {user.phone} is verified.</p>
                </div>
            </div>
        );
    }

    const handleSendOtp = async () => {
        setError('');
        setMessage('');
        setStep('sending');
        try {
            // Note: phone needs to be handled if they didn't provide one during registration.
            // For now, we assume user.phone exists or prompt them to add one.
            if (!user?.phone) {
                setError('No phone number found. Please update your profile first (feature coming soon).');
                setStep('initial');
                return;
            }
            const res = await authService.sendMobileOtp(user.phone, user.token);
            if (res.success) {
                setMessage(res.message);
                setStep('verify');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP. Check server console.');
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
                // Ideally update AuthContext so `user.mobileVerified` reflects true instantly
                user.mobileVerified = true;
                setStep('success');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid or expired OTP');
            setStep('verify');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-900 border-b border-gray-100 pb-4">
                <div className="p-2 bg-blue-50 text-accent rounded-full">
                    <Smartphone className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg">Mobile Verification</h3>
                    <p className="text-sm text-gray-500">Secure your account by verifying your mobile number.</p>
                </div>
            </div>

            {error && <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md">{error}</div>}
            {message && step !== 'success' && <div className="p-3 bg-green-50 text-green-700 text-sm rounded-md">{message}</div>}

            {step === 'initial' && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="text-sm text-gray-700">
                        Current Number: <span className="font-medium">{user?.phone || 'Not provided'}</span>
                    </p>
                    <Button onClick={handleSendOtp} disabled={!user?.phone}>
                        Send SMS OTP
                    </Button>
                </div>
            )}

            {step === 'sending' && (
                <div className="text-center py-4 text-gray-500 text-sm animate-pulse">
                    Sending code to {user?.phone}...
                </div>
            )}

            {step === 'verify' && (
                <form onSubmit={handleVerifyOtp} className="space-y-4 pt-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Enter 6-digit Code</label>
                        <Input
                            type="text"
                            maxLength="6"
                            placeholder="123456"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex gap-3">
                        <Button type="submit" className="flex-1">Verify Code</Button>
                        <Button type="button" variant="outline" onClick={() => setStep('initial')}>Cancel</Button>
                    </div>
                </form>
            )}

            {step === 'verifying' && (
                <div className="text-center py-4 text-gray-500 text-sm animate-pulse">
                    Verifying code...
                </div>
            )}

            {step === 'success' && (
                <div className="text-center py-6 space-y-2">
                    <div className="mx-auto w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                        <CheckCircle className="h-6 w-6" />
                    </div>
                    <h4 className="font-medium text-gray-900">Verification Successful</h4>
                    <p className="text-sm text-gray-500">Your mobile number is now verified.</p>
                </div>
            )}
        </div>
    );
};

export default MobileVerification;
