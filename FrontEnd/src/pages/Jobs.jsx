import React, { useState, useEffect } from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import JobCard from '../components/shared/JobCard';
import FilterSidebar from '../components/shared/FilterSidebar';
import CompanyCluster from '../components/shared/CompanyCluster';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import jobService from '../features/jobs/jobService';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [visibleJobs, setVisibleJobs] = useState(5);
    const [sortBy, setSortBy] = useState('newest');

    // Filter states
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedSalaries, setSelectedSalaries] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedWorkModes, setSelectedWorkModes] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState(null);

    // Search states
    const [searchTitle, setSearchTitle] = useState('');
    const [searchLocation, setSearchLocation] = useState('');

    const fetchJobs = async () => {
        setLoading(true);
        try {
            // Build params
            const params = {
                keyword: searchTitle,
                location: searchLocation,
                sortBy
            };

            if (selectedTypes.length > 0) params.type = selectedTypes.join(',');
            if (selectedWorkModes.length > 0) params.workMode = selectedWorkModes.join(',');
            if (selectedExperience !== null) params.experience = selectedExperience;
            if (selectedLocations.length > 0) params.location = selectedLocations.join(',');

            // Salary handling - just taking the first one for now or we could sum them
            // In a real app, we might want to handle multiple ranges on backend
            if (selectedSalaries.length > 0) {
                const ranges = selectedSalaries[0].split('-');
                params.minSalary = ranges[0];
                if (ranges[1]) params.maxSalary = ranges[1];
            }

            const data = await jobService.getJobs(params);
            setJobs(data);
        } catch (error) {
            console.error("Failed to fetch jobs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [sortBy, selectedTypes, selectedSalaries, selectedLocations, selectedWorkModes, selectedExperience]);

    const handleLoadMore = () => {
        setVisibleJobs(prevVisibleJobs => prevVisibleJobs + 5);
    };

    const handleTypeChange = (type) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handleSalaryChange = (range) => {
        setSelectedSalaries(prev =>
            prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
        );
    };

    const handleLocationChange = (loc) => {
        setSelectedLocations(prev =>
            prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
        );
    };

    const handleWorkModeChange = (mode) => {
        setSelectedWorkModes(prev =>
            prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
        );
    };

    const handleExperienceChange = (exp) => {
        setSelectedExperience(exp);
    };

    const clearFilters = () => {
        setSelectedTypes([]);
        setSelectedSalaries([]);
        setSelectedLocations([]);
        setSelectedWorkModes([]);
        setSelectedExperience(null);
        setSearchTitle('');
        setSearchLocation('');
    };

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        fetchJobs();
    };

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-905 transition-colors duration-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Professional Search</h1>
                            <p className="mt-2 text-gray-500 dark:text-gray-400 text-lg font-medium">Browse through our exclusive catalog of verified remote positions.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSearch} className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-xl shadow-primary/5 border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-3">
                        <div className="flex-[2] flex items-center px-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                            <Search className="h-5 w-5 text-gray-400 mr-3" />
                            <Input
                                placeholder="Skills, Designations, Companies"
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                                className="border-none shadow-none focus-visible:ring-0 dark:bg-transparent dark:text-white dark:placeholder-gray-500 h-12 text-lg"
                            />
                        </div>
                        <div className="flex-1 flex items-center px-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                            <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                            <Input
                                placeholder="Enter location"
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}
                                className="border-none shadow-none focus-visible:ring-0 dark:bg-transparent dark:text-white dark:placeholder-gray-500 h-12 text-lg"
                            />
                        </div>
                        <Button type="submit" size="lg" className="px-10 h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-blue-800 transition-all">
                            Search Pipeline
                        </Button>
                    </form>

                    <div className="mt-12">
                        <CompanyCluster />
                    </div>

                    <div className="mt-8 md:hidden">
                        <Button variant="outline" className="w-full h-12 rounded-xl flex items-center justify-center gap-2 border-gray-200 font-bold dark:border-gray-700 dark:text-white" onClick={() => setShowFilters(!showFilters)}>
                            <SlidersHorizontal className="h-4 w-4" />
                            {showFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar Filters - Hidden on mobile unless toggled */}
                    <div className={`md:col-span-1 ${showFilters ? 'block' : 'hidden md:block'}`}>
                        <FilterSidebar
                            selectedTypes={selectedTypes}
                            selectedSalaries={selectedSalaries}
                            selectedLocations={selectedLocations}
                            selectedWorkModes={selectedWorkModes}
                            selectedExperience={selectedExperience}
                            handleTypeChange={handleTypeChange}
                            handleSalaryChange={handleSalaryChange}
                            handleLocationChange={handleLocationChange}
                            handleWorkModeChange={handleWorkModeChange}
                            handleExperienceChange={handleExperienceChange}
                            clearFilters={clearFilters}
                        />
                    </div>

                    {/* Job List */}
                    <div className="md:col-span-3 space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            {!loading && (
                                <p className="text-gray-600 dark:text-gray-300">
                                    Showing <span className="font-semibold text-gray-900 dark:text-white">{jobs.length}</span> jobs
                                </p>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
                                <select
                                    className="text-sm border-gray-300 dark:border-gray-600 rounded-md py-1 pl-2 pr-8 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 dark:text-white font-medium"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="salary-high">Salary: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium">Fetching best jobs for you...</p>
                            </div>
                        ) : jobs && jobs.length > 0 ? (
                            <div className="space-y-4">
                                {jobs.slice(0, visibleJobs).map((job) => (
                                    <JobCard key={job._id} job={job} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600">
                                <p className="text-gray-500 dark:text-gray-400 text-xl font-medium">No jobs found matching your criteria.</p>
                                <Button className="mt-6 px-8" variant="outline" onClick={clearFilters}>Clear All Filters</Button>
                            </div>
                        )}

                        {!loading && jobs && visibleJobs < jobs.length && (
                            <div className="mt-8 flex justify-center">
                                <Button variant="outline" onClick={handleLoadMore} className="px-10 h-12 rounded-xl border-2 font-bold dark:text-white dark:border-gray-600 dark:hover:bg-gray-700">Load More Jobs</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
