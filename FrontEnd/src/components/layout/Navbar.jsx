import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Briefcase, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <nav className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <Briefcase className="h-8 w-8 text-accent" />
                            <span className="text-xl font-bold text-primary">JobSphere</span>
                        </Link>
                        <div className="hidden md:ml-10 md:flex md:space-x-8">
                            <Link to="/jobs" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Find Jobs</Link>
                            <Link to="/companies" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Companies</Link>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/login">
                            <Button variant="ghost" size="sm">Log In</Button>
                        </Link>
                        <Link to="/register">
                            <Button size="sm">Sign Up</Button>
                        </Link>
                        <div className="h-6 w-px bg-gray-200 mx-2"></div>
                        <Link to="/post-job" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                            Employers / Post Job
                        </Link>
                    </div>
                    <div className="-mr-2 flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
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
                <div className="md:hidden border-t border-gray-200">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <Link to="/jobs" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">Find Jobs</Link>
                        <Link to="/companies" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">Companies</Link>
                        <Link to="/post-job" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">Post a Job</Link>
                    </div>
                    <div className="border-t border-gray-200 pb-3 pt-4">
                        <div className="flex items-center px-5 gap-3">
                            <Link to="/login" className="w-full">
                                <Button variant="outline" className="w-full justify-center">Log In</Button>
                            </Link>
                            <Link to="/register" className="w-full">
                                <Button className="w-full justify-center">Sign Up</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
