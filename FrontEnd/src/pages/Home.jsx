import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Link } from 'react-router-dom';
import JobCard from '../components/shared/JobCard';
import { Search, MapPin, Briefcase, DollarSign } from 'lucide-react';
import jobService from '../features/jobs/jobService';

const Home = () => {
    const [featuredJobs, setFeaturedJobs] = useState([]);
    const [latestJobs, setLatestJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await jobService.getJobs();
                if (data) {
                    setFeaturedJobs(data.slice(0, 4)); // Mock logic: take first 4 as featured
                    setLatestJobs(data.slice(0, 5)); // Mock logic: take first 5 as latest
                }
            } catch (error) {
                console.error("Failed to fetch jobs", error);
            }
        };

        fetchJobs();
    }, []);
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-primary dark:bg-gray-900 pt-20 pb-32 px-4 sm:px-6 lg:px-8 text-center transition-colors duration-300">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
                        Find Your Dream <span className="text-accent">Remote Job</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Discover thousands of remote opportunities at top companies. Work from anywhere, anytime.
                    </p>

                    <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg max-w-3xl mx-auto flex flex-col sm:flex-row gap-2 transition-colors duration-300">
                        <div className="flex-1">
                            <Input
                                placeholder="Job title, keywords, or company"
                                icon={Search}
                                className="border-0 shadow-none focus-visible:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>
                        <div className="w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
                        <div className="flex-1">
                            <Input
                                placeholder="Location (optional)"
                                icon={MapPin}
                                className="border-0 shadow-none focus-visible:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>
                        <Button size="lg" className="w-full sm:w-auto px-8">
                            Find Jobs
                        </Button>
                    </div>

                    <div className="mt-8 flex justify-center gap-4 text-sm text-gray-400">
                        <span>Popular:</span>
                        <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">Frontend</span>
                        <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">Backend</span>
                        <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">Design</span>
                        <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">Product</span>
                    </div>
                </div>
            </section>

            {/* Featured Jobs Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Jobs</h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">Hand-picked remote roles for you.</p>
                        </div>
                        <Button variant="outline" className="dark:text-white dark:border-gray-600 dark:hover:bg-gray-800">View All Jobs</Button>
                    </div>

                    <div className="grid gap-6">
                        {featuredJobs && featuredJobs.length > 0 ? (
                            featuredJobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))
                        ) : (
                            <p className="dark:text-gray-400">No featured jobs found.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Latest Jobs Section (Grid) */}
            <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Latest Opportunities</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400 text-lg">Fresh jobs posted just now.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestJobs && latestJobs.length > 0 ? (
                            latestJobs.map((job) => (
                                <div key={job._id} className="border border-gray-100 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all bg-gray-50 dark:bg-gray-700/50">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="h-10 w-10 rounded bg-white dark:bg-gray-600 flex items-center justify-center shadow-sm text-lg font-bold text-primary dark:text-white">
                                            {job.company.charAt(0)}
                                        </div>
                                        <span className="text-xs font-medium bg-white dark:bg-gray-600 px-2 py-1 rounded border border-gray-200 dark:border-gray-500 text-gray-500 dark:text-gray-300">{new Date(job.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">{job.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{job.company}</p>
                                    <div className="flex gap-2 mb-4">
                                        <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">{job.type}</span>
                                        <span className="text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded">{job.salary}</span>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-500">Apply Now</Button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 dark:text-gray-400">No latest jobs found.</div>
                        )}
                    </div>

                    <div className="mt-12 text-center">
                        <Button size="lg" variant="secondary">Browse All Jobs</Button>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-accent text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your remote career?</h2>
                    <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
                        Join thousands of other professionals who have found their dream remote jobs through JobSphere.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-accent hover:bg-gray-100 text-lg px-8">Find a Job</Button>
                        <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-600 text-lg px-8">Post a Job</Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
