import React from 'react';
import { Button } from '../ui/Button';

const FilterSidebar = () => {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg text-gray-900">Filters</h3>
                <button className="text-sm text-accent hover:underline">Clear all</button>
            </div>

            <div className="space-y-6">
                {/* Job Type */}
                <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Job Type</h4>
                    <div className="space-y-2">
                        {['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'].map((type) => (
                            <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" />
                                <span className="text-sm text-gray-600 group-hover:text-gray-900">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-gray-200"></div>

                {/* Salary Range */}
                <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Salary Range</h4>
                    <div className="space-y-2">
                        {['$50k - $80k', '$80k - $120k', '$120k - $150k', '$150k+'].map((range) => (
                            <label key={range} className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" />
                                <span className="text-sm text-gray-600 group-hover:text-gray-900">{range}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-gray-200"></div>

                {/* Experience Level */}
                <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Experience Level</h4>
                    <div className="space-y-2">
                        {['Entry Level', 'Mid Level', 'Senior Level', 'Lead / Manager'].map((level) => (
                            <label key={level} className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" />
                                <span className="text-sm text-gray-600 group-hover:text-gray-900">{level}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="pt-4">
                    <Button className="w-full">Apply Filters</Button>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
