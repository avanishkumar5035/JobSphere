import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Briefcase, Menu, X, Sun, Moon } from 'lucide-react';
import AuthContext from '../../context/AuthContext';
import ThemeContext from '../../context/ThemeContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 py-2' : 'bg-transparent py-4'}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-primary p-2 rounded-xl transform group-hover:rotate-6 transition-transform shadow-lg shadow-primary/20">
                                <Briefcase className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                                Talent<span className="text-primary">Bridge</span>
                            </span>
                        </Link>
                        <div className="hidden lg:ml-12 lg:flex lg:space-x-8">
                            {[
                                { name: 'Find Jobs', path: '/jobs' },
                                { name: 'Companies', path: '/companies' },
                                { name: 'Resources', path: '/resources' },
                                { name: 'Premium', path: '/premium' },
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white px-1 py-2 text-sm font-black uppercase tracking-widest transition-colors relative group"
                                >
                                    {item.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-all transform hover:scale-110"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        {user ? (
                            <div className="flex items-center gap-6">
                                <Link to={user.role === 'admin' ? '/admin' : (user.role === 'employer' ? '/dashboard/employer' : '/dashboard')} className="flex items-center gap-3 group">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Signed in as</p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</p>
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent p-0.5 shadow-md">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=128&bold=true`}
                                            alt="Avatar"
                                            className="h-full w-full rounded-full object-cover border-2 border-white dark:border-gray-900"
                                        />
                                    </div>
                                </Link>
                                <Button variant="ghost" className="font-bold text-gray-500 hover:text-red-500 rounded-xl px-4" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login">
                                    <Button variant="ghost" className="font-black uppercase tracking-widest text-xs text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white">Log In</Button>
                                </Link>
                                <Link to="/register">
                                    <Button className="bg-primary hover:bg-primary-dark rounded-[14px] px-8 py-6 font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 premium-button">
                                        Sign Up
                                    </Button>
                                </Link>
                                <div className="h-8 w-px bg-gray-200 dark:bg-gray-800 mx-2"></div>
                                <Link to="/post-job" className="hidden lg:block text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">
                                    Employers
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="-mr-2 flex items-center md:hidden gap-3">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-xl bg-primary text-white shadow-lg shadow-primary/20"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden glass-card mx-4 mt-2 rounded-[24px] border border-gray-100 dark:border-gray-800 overflow-hidden animate-fade-in">
                    <div className="p-4 space-y-2">
                        {['Find Jobs', 'Companies', 'Resources', 'Premium'].map((item) => (
                            <Link
                                key={item}
                                to={`/${item.toLowerCase().replace(' ', '-')}`}
                                className="block px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:bg-primary/5 hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800">
                        {user ? (
                            <Button className="w-full h-12 rounded-xl font-black uppercase tracking-widest text-xs" onClick={handleLogout}>Logout</Button>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <Link to="/login" className="w-full">
                                    <Button variant="outline" className="w-full h-12 rounded-xl font-black uppercase tracking-widest text-xs">Login</Button>
                                </Link>
                                <Link to="/register" className="w-full">
                                    <Button className="w-full h-12 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
