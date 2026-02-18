import React, { useState } from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import JobCard from '../components/shared/JobCard';
import FilterSidebar from '../components/shared/FilterSidebar';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { JOBS } from '../lib/data';

const Jobs = () => {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Remote Jobs</h1>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Input placeholder="Search by job title, company, or keywords..." icon={Search} className="border-gray-200" />
                        </div>
                        <div className="flex-1">
                            <Input placeholder="Location or Timezone" icon={MapPin} className="border-gray-200" />
                        </div>
                        <Button size="lg" className="px-8">Search</Button>
                    </div>

                    <div className="mt-4 md:hidden">
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => setShowFilters(!showFilters)}>
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
                            <p className="text-gray-600">Showing <span className="font-semibold text-gray-900">{JOBS.length}</span> jobs</p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Sort by:</span>
                                <select className="text-sm border-gray-300 rounded-md py-1 pl-2 pr-8 focus:ring-accent focus:border-accent">
                                    <option>Newest</option>
                                    <option>Relevant</option>
                                    <option>Salary: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {JOBS.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}

                        <div className="mt-8 flex justify-center">
                            <Button variant="outline">Load More Jobs</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
