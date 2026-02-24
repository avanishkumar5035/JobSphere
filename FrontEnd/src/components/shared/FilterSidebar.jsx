import React from 'react';
import { Button } from '../ui/Button';

const FilterSidebar = ({
    selectedTypes = [],
    selectedSalaries = [],
    selectedLocations = [],
    selectedWorkModes = [],
    selectedExperience = null, // Single value usually for min exp
    handleTypeChange = () => { },
    handleSalaryChange = () => { },
    handleLocationChange = () => { },
    handleWorkModeChange = () => { },
    handleExperienceChange = () => { },
    clearFilters = () => { }
}) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-xl shadow-primary/5 sticky top-24 transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Search Filters</h3>
                <button onClick={clearFilters} className="text-xs text-primary font-black uppercase tracking-widest hover:text-blue-700 transition-colors">Reset</button>
            </div>

            <div className="space-y-8">
                {/* Work Mode */}
                <div>
                    <h4 className="text-[10px] font-black text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-[0.2em]">Work Environment</h4>
                    <div className="space-y-3">
                        {['On-site', 'Remote', 'Hybrid'].map((mode) => (
                            <label key={mode} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 rounded-lg border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-primary focus:ring-primary cursor-pointer transition-all"
                                    checked={selectedWorkModes.includes(mode)}
                                    onChange={() => handleWorkModeChange(mode)}
                                />
                                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors font-bold uppercase tracking-wider">{mode}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-gray-50 dark:bg-gray-800"></div>

                {/* Experience */}
                <div>
                    <h4 className="text-[10px] font-black text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-[0.2em]">Career Level</h4>
                    <div className="space-y-3">
                        {[
                            { label: 'Freshers (0-1 Yrs)', value: 0 },
                            { label: 'Junior (1-3 Yrs)', value: 1 },
                            { label: 'Mid-Level (3-5 Yrs)', value: 3 },
                            { label: 'Senior (5-7 Yrs)', value: 5 },
                            { label: 'Lead (7+ Yrs)', value: 7 }
                        ].map((exp) => (
                            <label key={exp.value} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="experience"
                                    className="h-5 w-5 border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-primary focus:ring-primary cursor-pointer transition-all"
                                    checked={selectedExperience === exp.value}
                                    onChange={() => handleExperienceChange(exp.value)}
                                />
                                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors font-bold uppercase tracking-wider">{exp.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-gray-50 dark:bg-gray-800"></div>

                {/* Location Filter */}
                <div>
                    <h4 className="text-[10px] font-black text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-[0.2em]">Regional Hubs</h4>
                    <div className="space-y-3">
                        {['Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai'].map((loc) => (
                            <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 rounded-lg border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-primary focus:ring-primary cursor-pointer transition-all"
                                    checked={selectedLocations.includes(loc)}
                                    onChange={() => handleLocationChange(loc)}
                                />
                                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors font-bold uppercase tracking-wider">{loc}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-gray-50 dark:bg-gray-800"></div>

                {/* Job Type */}
                <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider">Job Type</h4>
                    <div className="space-y-2">
                        {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                            <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary"
                                    checked={selectedTypes.includes(type)}
                                    onChange={() => handleTypeChange(type)}
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white font-medium transition-colors">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-gray-100 dark:bg-gray-700"></div>

                {/* Salary Range */}
                <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider">Salary (Annual)</h4>
                    <div className="space-y-2">
                        {[
                            { label: '0-3 Lakhs', value: '0-300000' },
                            { label: '3-6 Lakhs', value: '300000-600000' },
                            { label: '6-10 Lakhs', value: '600000-1000000' },
                            { label: '10-15 Lakhs', value: '1000000-1500000' },
                            { label: '15+ Lakhs', value: '1500000-99999999' }
                        ].map((range) => (
                            <label key={range.value} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary"
                                    checked={selectedSalaries.includes(range.value)}
                                    onChange={() => handleSalaryChange(range.value)}
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white font-medium transition-colors">{range.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-gray-100 dark:bg-gray-700 pt-2"></div>

                <div className="pt-2">
                    <Button className="w-full font-bold rounded-xl h-11 border-2" variant="outline" onClick={clearFilters}>Reset All Filters</Button>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
