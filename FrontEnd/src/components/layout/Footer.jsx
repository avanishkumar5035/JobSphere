import React from 'react';
import { Briefcase, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Briefcase className="h-6 w-6 text-accent" />
                            <span className="text-lg font-bold text-primary">JobSphere</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                            Connecting top talent with the best remote opportunities worldwide.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">For Candidates</h3>
                        <ul className="space-y-3">
                            <li><Link to="/jobs" className="text-sm text-gray-600 hover:text-accent">Browse Jobs</Link></li>
                            <li><Link to="/companies" className="text-sm text-gray-600 hover:text-accent">Browse Companies</Link></li>
                            <li><Link to="/dashboard" className="text-sm text-gray-600 hover:text-accent">Candidate Dashboard</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">For Employers</h3>
                        <ul className="space-y-3">
                            <li><Link to="/post-job" className="text-sm text-gray-600 hover:text-accent">Post a Job</Link></li>
                            <li><Link to="/pricing" className="text-sm text-gray-600 hover:text-accent">Pricing Plans</Link></li>
                            <li><Link to="/dashboard/employer" className="text-sm text-gray-600 hover:text-accent">Employer Dashboard</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="text-sm text-gray-600 hover:text-accent">About Us</Link></li>
                            <li><Link to="/contact" className="text-sm text-gray-600 hover:text-accent">Contact</Link></li>
                            <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-accent">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-sm text-gray-600 hover:text-accent">Terms of Service</Link></li>
                            <li><Link to="/admin/login" className="text-sm text-gray-600 hover:text-accent">Admin Login</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-8">
                    <p className="text-xs text-gray-400 text-center">
                        &copy; {new Date().getFullYear()} JobSphere. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
