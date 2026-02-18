import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { JOBS } from '../../lib/data';
import { Users, FileText, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmployerDashboard = () => {
    const postedJobs = JOBS.slice(0, 3); // Mocking posted jobs

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
                    <Link to="/post-job">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" /> Post a Job
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                                <p className="text-3xl font-bold text-gray-900">3</p>
                            </div>
                            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-accent">
                                <FileText className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Applicants</p>
                                <p className="text-3xl font-bold text-gray-900">48</p>
                            </div>
                            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                <Users className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Job Listings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Your Job Postings</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {postedJobs.map((job) => (
                            <div key={job.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                                    <div className="flex gap-4 text-sm text-gray-500 mt-1">
                                        <span>{job.type}</span>
                                        <span>•</span>
                                        <span>{job.location}</span>
                                        <span>•</span>
                                        <span>Posted {job.postedAt}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-center px-4">
                                        <span className="block text-xl font-bold text-gray-900">12</span>
                                        <span className="text-xs text-gray-500">Applicants</span>
                                    </div>
                                    <Button variant="outline" size="sm">Manage</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;
