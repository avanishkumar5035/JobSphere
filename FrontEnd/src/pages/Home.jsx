import React from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import JobCard from '../components/shared/JobCard';
import { Search, MapPin } from 'lucide-react';
import { JOBS } from '../lib/data';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-primary pt-20 pb-32 px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
                        Find Your Dream <span className="text-accent">Remote Job</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Discover thousands of remote opportunities at top companies. Work from anywhere, anytime.
                    </p>

                    <div className="bg-white p-2 rounded-lg shadow-lg max-w-3xl mx-auto flex flex-col sm:flex-row gap-2">
                        <div className="flex-1">
                            <Input
                                placeholder="Job title, keywords, or company"
                                icon={Search}
                                className="border-0 shadow-none focus-visible:ring-0"
                            />
                        </div>
                        <div className="w-px bg-gray-200 hidden sm:block"></div>
                        <div className="flex-1">
                            <Input
                                placeholder="Location (optional)"
                                icon={MapPin}
                                className="border-0 shadow-none focus-visible:ring-0"
                            />
                        </div>
                        <Button size="lg" className="w-full sm:w-auto px-8">
                            Find Jobs
                        </Button>
                    </div>

                    <div className="mt-8 flex justify-center gap-4 text-sm text-gray-400">
                        <span>Popular:</span>
                        <span className="text-gray-300 hover:text-white cursor-pointer">Frontend</span>
                        <span className="text-gray-300 hover:text-white cursor-pointer">Backend</span>
                        <span className="text-gray-300 hover:text-white cursor-pointer">Design</span>
                        <span className="text-gray-300 hover:text-white cursor-pointer">Product</span>
                    </div>
                </div>
            </section>

            {/* Featured Jobs Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
                            <p className="mt-2 text-gray-600">Hand-picked remote roles for you.</p>
                        </div>
                        <Button variant="outline">View All Jobs</Button>
                    </div>

                    <div className="grid gap-6">
                        {JOBS.slice(0, 4).map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest Jobs Section (Grid) */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Latest Opportunities</h2>
                        <p className="mt-2 text-gray-600 text-lg">Fresh jobs posted just now.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {JOBS.map((job) => (
                            <div key={job.id} className="border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow bg-gray-50">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="h-10 w-10 rounded bg-white flex items-center justify-center shadow-sm text-lg font-bold text-primary">
                                        {job.company.charAt(0)}
                                    </div>
                                    <span className="text-xs font-medium bg-white px-2 py-1 rounded border border-gray-200 text-gray-500">{job.postedAt}</span>
                                </div>
                                <h3 className="font-semibold text-lg text-gray-900 mb-1">{job.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{job.company}</p>
                                <div className="flex gap-2 mb-4">
                                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">{job.type}</span>
                                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">{job.salary}</span>
                                </div>
                                <Button variant="outline" size="sm" className="w-full">Apply Now</Button>
                            </div>
                        ))}
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
