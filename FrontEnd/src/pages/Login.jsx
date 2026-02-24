import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Mail, Lock, Briefcase, ChevronRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const res = await login(email, password);
            if (res.success) {
                // Check for mobile verification (skip for admin)
                if (res.user.role !== 'admin' && !res.user.mobileVerified) {
                    navigate('/verify-mobile', { replace: true });
                } else {
                    // Role-based redirection
                    const from = location.state?.from?.pathname || (res.user.role === 'admin' ? '/admin' : (res.user.role === 'employer' ? '/dashboard/employer' : '/dashboard'));
                    navigate(from, { replace: true });
                }
            } else {
                setError(res.message || 'Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 dark:bg-gray-950/50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-accent/10 blur-[120px] animate-pulse delay-700" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <div className="text-center mb-8">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link to="/" className="inline-flex items-center gap-2 justify-center group">
                            <div className="p-2 rounded-xl bg-primary shadow-lg shadow-primary/20 group-hover:bg-primary/90 transition-colors">
                                <Briefcase className="h-8 w-8 text-white" />
                            </div>
                            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">JobSphere</span>
                        </Link>
                    </motion.div>
                    <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                            Create one for free
                        </Link>
                    </p>
                </div>

                <Card className="border-none shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl ring-1 ring-gray-200 dark:ring-gray-800">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold dark:text-white">Sign In</CardTitle>
                        <CardDescription className="dark:text-gray-400">Enter your credentials to access your dashboard</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center gap-3 text-red-600 dark:text-red-400"
                                    >
                                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                        <span className="text-sm font-medium">{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                    Email Address
                                </label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="name@example.com"
                                    icon={Mail}
                                    className="h-12 border-gray-200 dark:border-gray-800 focus:ring-primary/20"
                                    value={email}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Password
                                    </label>
                                    <Link to="/forgot-password" title="Forgot Password" className="text-xs font-semibold text-primary hover:text-primary/80">
                                        Forgot?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                    required
                                    placeholder="••••••••"
                                    icon={Lock}
                                    className="h-12 border-gray-200 dark:border-gray-800 focus:ring-primary/20"
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="flex items-center ml-1">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary focus:ring-primary cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                                    Remember me
                                </label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-bold transition-all"
                                isLoading={isLoading}
                                variant="primary"
                            >
                                {isLoading ? 'Authenticating...' : (
                                    <span className="flex items-center justify-center gap-2">
                                        Sign In <ChevronRight className="h-5 w-5" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 border-t border-gray-100 dark:border-gray-800 pt-6">
                        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                            <ArrowLeft className="h-4 w-4" /> Back to Homepage
                        </Link>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
};

export default Login;
