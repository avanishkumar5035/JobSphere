import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';
import { MapPin, DollarSign, Clock, Building, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { JOBS } from '../lib/data';

const JobDetails = () => {
    const { id } = useParams();
    const job = JOBS.find(j => j.id === parseInt(id));

    if (!job) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h2>
                <Link to="/jobs">
                    <Button>Back to Jobs</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/jobs" className="inline-flex items-center text-sm text-gray-500 hover:text-accent mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Jobs
                </Link>

                {/* Header Card */}
                <Card className="mb-8 overflow-hidden">
                    <div className="bg-primary/5 h-24 sm:h-32 w-full"></div>
                    <CardContent className="px-8 pb-8 -mt-12 sm:-mt-16 relative">
                        <div className="flex flex-col sm:flex-row justify-between items-start">
                            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end mb-6 sm:mb-0">
                                <div className="h-24 w-24 rounded-xl bg-white shadow-md p-1">
                                    <img
                                        src={job.companyLogo}
                                        alt={job.company}
                                        className="h-full w-full object-cover rounded-lg"
                                    />
                                </div>
                                <div className="pb-1">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1 font-medium">
                                            <Building className="h-4 w-4" />
                                            {job.company}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            {job.location}
                                        </span>
                                        <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-100">
                                            {job.postedAt}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-16">
                                <Button variant="outline" size="icon">
                                    <Bookmark className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                                <Button className="flex-1 sm:flex-none px-8">Apply Now</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {job.description}
                            </p>

                            <h3 className="text-lg font-bold text-gray-900 mb-3">Requirements</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
                                {job.requirements && job.requirements.map((req, idx) => (
                                    <li key={idx}>{req}</li>
                                ))}
                            </ul>

                            <h3 className="text-lg font-bold text-gray-900 mb-3">Benefits</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                <li>Competitive salary and equity</li>
                                <li>Remote-first culture</li>
                                <li>Health, dental, and vision insurance</li>
                                <li>Flexible vacation policy</li>
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Job Overview</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Salary</p>
                                    <div className="flex items-center gap-2 font-medium text-gray-900">
                                        <DollarSign className="h-4 w-4 text-accent" />
                                        {job.salary}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Job Type</p>
                                    <div className="flex items-center gap-2 font-medium text-gray-900">
                                        <Clock className="h-4 w-4 text-accent" />
                                        {job.type}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Location</p>
                                    <div className="flex items-center gap-2 font-medium text-gray-900">
                                        <MapPin className="h-4 w-4 text-accent" />
                                        {job.location}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <h4 className="text-sm font-medium text-gray-900 mb-3">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {job.tags && job.tags.map((tag, idx) => (
                                        <Badge key={idx} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary rounded-xl shadow-sm p-6 text-white text-center">
                            <h3 className="font-bold text-xl mb-2">Better with the app</h3>
                            <p className="text-blue-100 text-sm mb-4">Get notified about new jobs in real-time.</p>
                            <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-primary">Download App</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
