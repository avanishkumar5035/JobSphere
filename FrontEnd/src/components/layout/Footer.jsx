import React from 'react';
import { Briefcase, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-primary p-1 rounded">
                                <Briefcase className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-lg font-bold text-primary dark:text-white">TalentBridge</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Connecting top talent with the best professional opportunities worldwide. Build your future with TalentBridge.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">For Candidates</h3>
                        <ul className="space-y-3">
                            <li><Link to="/jobs" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">Browse Jobs</Link></li>
                            <li><Link to="/companies" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">Browse Companies</Link></li>
                            <li><Link to="/dashboard" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">Candidate Dashboard</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">For Employers</h3>
                        <ul className="space-y-3">
                            <li><Link to="/post-job" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">Post a Job</Link></li>
                            <li><Link to="/pricing" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">Pricing Plans</Link></li>
                            <li><Link to="/dashboard/employer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">Employer Dashboard</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">About Us</Link></li>
                            <li><Link to="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">Contact</Link></li>
                            <li><Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">Terms of Service</Link></li>
                            <li><Link to="/admin/login" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">Admin Login</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
                    <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                        &copy; {new Date().getFullYear()} TalentBridge. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
