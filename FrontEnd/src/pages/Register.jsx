import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { Mail, Lock, Briefcase, User, Building } from 'lucide-react';
import { cn } from '../lib/utils';

const Register = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('seeker'); // 'seeker' or 'employer'

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, handle registration logic here
        navigate(role === 'employer' ? '/dashboard/employer' : '/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center gap-2 justify-center">
                        <Briefcase className="h-10 w-10 text-accent" />
                        <span className="text-2xl font-bold text-primary">JobSphere</span>
                    </Link>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-accent hover:text-blue-500">
                            Sign in
                        </Link>
                    </p>
                </div>

                <Card className="mt-8">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <button
                                type="button"
                                onClick={() => setRole('seeker')}
                                className={cn(
                                    "flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all",
                                    role === 'seeker'
                                        ? "border-accent bg-blue-50 text-accent"
                                        : "border-gray-200 hover:border-gray-300 text-gray-500 hover:bg-gray-50"
                                )}
                            >
                                <User className="h-6 w-6 mb-2" />
                                <span className="text-sm font-medium">Job Seeker</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('employer')}
                                className={cn(
                                    "flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all",
                                    role === 'employer'
                                        ? "border-accent bg-blue-50 text-accent"
                                        : "border-gray-200 hover:border-gray-300 text-gray-500 hover:bg-gray-50"
                                )}
                            >
                                <Building className="h-6 w-6 mb-2" />
                                <span className="text-sm font-medium">Employer</span>
                            </button>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name
                                    </label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        required
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name
                                    </label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        required
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            {role === 'employer' && (
                                <div>
                                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Company Name
                                    </label>
                                    <Input
                                        id="companyName"
                                        name="companyName"
                                        type="text"
                                        required
                                        placeholder="Acme Inc."
                                        icon={Building}
                                    />
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email address
                                </label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="you@example.com"
                                    icon={Mail}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    placeholder="••••••••"
                                    icon={Lock}
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    required
                                    className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                                />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                    I agree to the <a href="#" className="text-accent hover:underline">Terms of Service</a> and <a href="#" className="text-accent hover:underline">Privacy Policy</a>
                                </label>
                            </div>

                            <Button type="submit" className="w-full">
                                Create Account
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Register;
