import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { JOBS } from '../../lib/data';
import { Users, Briefcase, Trash2, Shield } from 'lucide-react';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('jobs');

    // Mock Users Data
    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Seeker", joined: "2 days ago" },
        { id: 2, name: "Alice Smith", email: "alice@techflow.com", role: "Employer", joined: "1 week ago" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Seeker", joined: "3 days ago" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-red-100 rounded-lg text-red-600">
                        <Shield className="h-6 w-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Users</p>
                                <p className="text-3xl font-bold text-gray-900">1,234</p>
                            </div>
                            <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                <Users className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Jobs</p>
                                <p className="text-3xl font-bold text-gray-900">{JOBS.length}</p>
                            </div>
                            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-accent">
                                <Briefcase className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 rounded-xl bg-gray-200 p-1 mb-6 w-fit">
                    <button
                        className={`w-32 rounded-lg py-2.5 text-sm font-medium leading-5 transition-all ${activeTab === 'jobs' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'}`}
                        onClick={() => setActiveTab('jobs')}
                    >
                        Manage Jobs
                    </button>
                    <button
                        className={`w-32 rounded-lg py-2.5 text-sm font-medium leading-5 transition-all ${activeTab === 'users' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'}`}
                        onClick={() => setActiveTab('users')}
                    >
                        Manage Users
                    </button>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {activeTab === 'jobs' ? (
                        <div className="divide-y divide-gray-200">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">All Jobs</h3>
                            </div>
                            {JOBS.map((job) => (
                                <div key={job.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{job.title}</h4>
                                        <p className="text-sm text-gray-500">{job.company}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge variant="secondary">{job.type}</Badge>
                                        <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 grid grid-cols-4">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider col-span-2">User</h3>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Role</h3>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider text-right">Action</h3>
                            </div>
                            {users.map((user) => (
                                <div key={user.id} className="p-6 grid grid-cols-4 items-center hover:bg-gray-50">
                                    <div className="col-span-2">
                                        <h4 className="font-semibold text-gray-900">{user.name}</h4>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                    <div>
                                        <Badge variant={user.role === 'Employer' ? 'secondary' : 'default'} className={user.role === 'Employer' ? 'bg-purple-100 text-purple-700' : ''}>
                                            {user.role}
                                        </Badge>
                                    </div>
                                    <div className="text-right">
                                        <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AdminPanel;
