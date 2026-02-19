import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Briefcase, Menu, X, Sun, Moon } from 'lucide-react';
import AuthContext from '../../context/AuthContext';
import ThemeContext from '../../context/ThemeContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <Briefcase className="h-8 w-8 text-accent" />
                            <span className="text-xl font-bold text-primary dark:text-white">JobSphere</span>
                        </Link>
                        <div className="hidden md:ml-10 md:flex md:space-x-8">
                            <Link to="/jobs" className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Find Jobs</Link>
                            <Link to="/companies" className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Companies</Link>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Welcome, {user.name}
                                </span>
                                {user.role === 'employer' && (
                                    <Link to="/post-job" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                        Post Job
                                    </Link>
                                )}
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                        Admin Panel
                                    </Link>
                                )}
                                <Button variant="outline" size="sm" onClick={handleLogout} className="dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600">
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" size="sm" className="dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">Log In</Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="sm">Sign Up</Button>
                                </Link>
                                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
                                <Link to="/post-job" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                    Employers / Post Job
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="-mr-2 flex items-center md:hidden gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <Link to="/jobs" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Find Jobs</Link>
                        <Link to="/companies" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Companies</Link>
                        {user && user.role === 'employer' && (
                            <Link to="/post-job" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Post a Job</Link>
                        )}
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pb-3 pt-4">
                        <div className="flex items-center px-5 gap-3 flex-col">
                            {user ? (
                                <Button className="w-full justify-center" onClick={handleLogout}>Logout</Button>
                            ) : (
                                <>
                                    <Link to="/login" className="w-full">
                                        <Button variant="outline" className="w-full justify-center dark:bg-gray-700 dark:text-white dark:border-gray-600">Log In</Button>
                                    </Link>
                                    <Link to="/register" className="w-full">
                                        <Button className="w-full justify-center">Sign Up</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
