import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { JOBS } from '../../lib/data';
import { Briefcase, Bookmark, CheckCircle, Clock, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const SeekerDashboard = () => {
    // Mock data
    const appliedJobs = JOBS.slice(0, 2);
    const savedJobs = JOBS.slice(2, 4);
    const notifications = [
        { id: 1, message: "Your application for Senior Frontend Engineer was viewed.", time: "2 hours ago" },
        { id: 2, message: "New job alert: Product Designer at Creatives Inc.", time: "5 hours ago" },
        { id: 3, message: "Complete your profile to get more job recommendations.", time: "1 day ago" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome back, John!</h1>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Applied Jobs</p>
                                <p className="text-3xl font-bold text-gray-900">12</p>
                            </div>
                            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-accent">
                                <Briefcase className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Saved Jobs</p>
                                <p className="text-3xl font-bold text-gray-900">5</p>
                            </div>
                            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                                <Bookmark className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Interviews</p>
                                <p className="text-3xl font-bold text-gray-900">2</p>
                            </div>
                            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                <CheckCircle className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Applied Jobs */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
                        {appliedJobs.map((job) => (
                            <Card key={job.id}>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{job.title}</h3>
                                            <p className="text-sm text-gray-500">{job.company}</p>
                                            <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                                                <Clock className="h-3 w-3" /> Applied 2 days ago
                                            </div>
                                        </div>
                                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">In Review</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Button variant="outline" className="w-full">View All Applications</Button>
                    </div>

                    {/* Saved Jobs */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900">Saved Jobs</h2>
                        {savedJobs.map((job) => (
                            <Card key={job.id}>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{job.title}</h3>
                                            <p className="text-sm text-gray-500">{job.company}</p>
                                        </div>
                                        <Link to={`/jobs/${job.id}`}>
                                            <Button size="sm" variant="outline">Apply</Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Button variant="outline" className="w-full">View All Saved Jobs</Button>
                    </div>
                    {/* Notifications */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="divide-y divide-gray-200">
                                {notifications.map((notif) => (
                                    <div key={notif.id} className="p-4 flex items-start gap-4">
                                        <div className="p-2 bg-blue-50 rounded-full text-accent mt-1 shrink-0">
                                            <Bell className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-900">{notif.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeekerDashboard;
