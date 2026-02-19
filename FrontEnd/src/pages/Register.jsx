import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { Mail, Lock, Briefcase, User, Building } from 'lucide-react';
import { cn } from '../lib/utils';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);
    const [role, setRole] = useState('seeker'); // 'seeker' or 'employer'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        companyName: '',
    });
    const { name, email, password, companyName } = formData;
    const [error, setError] = useState(null);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        // Combine First/Last name for simplicity or split in backend
        const res = await register(name, email, password, role);
        if (res.success) {
            navigate(role === 'employer' ? '/dashboard/employer' : '/dashboard');
        } else {
            setError(res.message);
        }
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
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={onChange}
                                    />
                                </div>
                                {/* Removed split First/Last Name for simplicity in this step, using single Name field as per backend model */}
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
                                        value={companyName}
                                        onChange={onChange}
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
                                    value={email}
                                    onChange={onChange}
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
                                    value={password}
                                    onChange={onChange}
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
