import React, { useState, useEffect } from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import JobCard from '../components/shared/JobCard';
import FilterSidebar from '../components/shared/FilterSidebar';
import { Search, MapPin, Briefcase, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import jobService from '../features/jobs/jobService';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [visibleJobs, setVisibleJobs] = useState(5);

    const handleLoadMore = () => {
        setVisibleJobs(prevVisibleJobs => prevVisibleJobs + 5);
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await jobService.getJobs();
                setJobs(data);
                setFilteredJobs(data);
            } catch (error) {
                console.error("Failed to fetch jobs", error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Browse Remote Jobs</h1>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 transition-colors duration-300">
                        <div className="flex-1">
                            <Input placeholder="Search by job title, company, or keywords..." icon={Search} className="border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" />
                        </div>
                        <div className="flex-1">
                            <Input placeholder="Location or Timezone" icon={MapPin} className="border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" />
                        </div>
                        <Button size="lg" className="px-8 dark:bg-primary dark:text-white">Search</Button>
                    </div>

                    <div className="mt-4 md:hidden">
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2 dark:bg-gray-700 dark:text-white dark:border-gray-600" onClick={() => setShowFilters(!showFilters)}>
                            <SlidersHorizontal className="h-4 w-4" />
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar Filters - Hidden on mobile unless toggled */}
                    <div className={`md:col-span-1 ${showFilters ? 'block' : 'hidden md:block'}`}>
                        <FilterSidebar />
                    </div>

                    {/* Job List */}
                    <div className="md:col-span-3 space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            {filteredJobs && filteredJobs.length > 0 && (
                                <p className="text-gray-600 dark:text-gray-300">Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredJobs.length}</span> jobs</p>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
                                <select className="text-sm border-gray-300 dark:border-gray-600 rounded-md py-1 pl-2 pr-8 focus:ring-accent focus:border-accent bg-white dark:bg-gray-700 dark:text-white">
                                    <option>Newest</option>
                                    <option>Relevant</option>
                                    <option>Salary: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {filteredJobs && filteredJobs.length > 0 ? (
                            filteredJobs.slice(0, visibleJobs).map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500 dark:text-gray-400 text-lg">No jobs found matching your criteria.</p>
                            </div>
                        )}

                        {filteredJobs && visibleJobs < filteredJobs.length && (
                            <div className="mt-8 flex justify-center">
                                <Button variant="outline" onClick={handleLoadMore} className="dark:text-white dark:border-gray-600 dark:hover:bg-gray-700">Load More Jobs</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
