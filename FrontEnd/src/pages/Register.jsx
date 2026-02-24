import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Mail, Lock, Briefcase, User, Building, Phone, ChevronRight, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);
    const [role, setRole] = useState('seeker'); // 'seeker' or 'employer'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        companyName: '',
    });
    const { name, email, phone, password, companyName } = formData;
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
            const res = await register(name, email, password, role, phone);
            if (res.success) {
                navigate('/verify-mobile', { replace: true });
            } else {
                setError(res.message || 'Registration failed. Please try again.');
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
                <div className="absolute top-[5%] left-[10%] w-[25%] h-[25%] rounded-full bg-primary/10 blur-[100px] animate-pulse" />
                <div className="absolute bottom-[5%] right-[10%] w-[25%] h-[25%] rounded-full bg-accent/10 blur-[100px] animate-pulse delay-1000" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg z-10"
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
                    <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Create your account</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                            Sign in here
                        </Link>
                    </p>
                </div>

                <Card className="border-none shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl ring-1 ring-gray-200 dark:ring-gray-800 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x" />
                    <CardHeader>
                        <div className="flex justify-between items-center mb-4">
                            <CardTitle className="text-xl font-bold dark:text-white">Get Started</CardTitle>
                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                                {role === 'seeker' ? 'Job Seeker' : 'Employer'}
                            </span>
                        </div>
                        <CardDescription className="dark:text-gray-400">Choose your role and fill in your details to join JobSphere</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex p-1 bg-gray-100 dark:bg-gray-800/50 rounded-xl mb-8">
                            <button
                                type="button"
                                onClick={() => setRole('seeker')}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300",
                                    role === 'seeker'
                                        ? "bg-white dark:bg-gray-700 text-primary shadow-sm ring-1 ring-gray-200 dark:ring-gray-600"
                                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                )}
                            >
                                <User className="h-4 w-4" /> Job Seeker
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('employer')}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300",
                                    role === 'employer'
                                        ? "bg-white dark:bg-gray-700 text-primary shadow-sm ring-1 ring-gray-200 dark:ring-gray-600"
                                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                )}
                            >
                                <Building className="h-4 w-4" /> Employer
                            </button>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-3 text-red-600 dark:text-red-400"
                                    >
                                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                        <span className="text-sm font-medium">{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="grid grid-cols-1 gap-5">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                        Full Name
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Enter your full name"
                                        icon={User}
                                        className="h-12 border-gray-200 dark:border-gray-800 focus:ring-primary/20 bg-white/50 dark:bg-gray-900/50"
                                        value={name}
                                        onChange={onChange}
                                    />
                                </div>

                                {role === 'employer' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-2"
                                    >
                                        <label htmlFor="companyName" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                            Company Name
                                        </label>
                                        <Input
                                            id="companyName"
                                            name="companyName"
                                            type="text"
                                            required
                                            placeholder="e.g. Acme Corporation"
                                            icon={Building}
                                            className="h-12 border-gray-200 dark:border-gray-800 focus:ring-primary/20 bg-white/50 dark:bg-gray-900/50"
                                            value={companyName}
                                            onChange={onChange}
                                        />
                                    </motion.div>
                                )}

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
                                        className="h-12 border-gray-200 dark:border-gray-800 focus:ring-primary/20 bg-white/50 dark:bg-gray-900/50"
                                        value={email}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                        Password
                                    </label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        placeholder="At least 6 characters"
                                        icon={Lock}
                                        className="h-12 border-gray-200 dark:border-gray-800 focus:ring-primary/20 bg-white/50 dark:bg-gray-900/50"
                                        value={password}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                        Phone Number
                                    </label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        icon={Phone}
                                        className="h-12 border-gray-200 dark:border-gray-800 focus:ring-primary/20 bg-white/50 dark:bg-gray-900/50"
                                        value={phone}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>

                            <div className="flex items-start ml-1 mt-2">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        required
                                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary focus:ring-primary cursor-pointer"
                                    />
                                </div>
                                <label htmlFor="terms" className="ml-3 text-sm text-gray-600 dark:text-gray-400 leading-tight">
                                    I agree to the <Link to="#" className="text-primary hover:text-primary/80 font-semibold underline-offset-4 hover:underline">Terms of Service</Link> and <Link to="#" className="text-primary hover:text-primary/80 font-semibold underline-offset-4 hover:underline">Privacy Policy</Link>
                                </label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-bold mt-4 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
                                isLoading={isLoading}
                                variant="primary"
                            >
                                {isLoading ? 'Creating Account...' : (
                                    <span className="flex items-center justify-center gap-2">
                                        Create Free Account <ChevronRight className="h-5 w-5" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 border-t border-gray-100 dark:border-gray-800 pt-6 mt-2 relative overflow-hidden">
                        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors z-10">
                            <ArrowLeft className="h-4 w-4" /> Back to Homepage
                        </Link>

                        {/* Decorative background for footer */}
                        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                            <CheckCircle2 className="h-20 w-20 text-primary translate-x-4 translate-y-4" />
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
};

export default Register;
