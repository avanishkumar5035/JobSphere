import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Users, Briefcase, BarChart, Settings, FileText, Trash2 } from 'lucide-react';
import authService from '../../features/auth/authService';
import jobService from '../../features/jobs/jobService';
import applicationService from '../../features/application/applicationService';
import AuthContext from '../../context/AuthContext';

const AdminPanel = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('overview');
    const [users, setUsers] = useState([]);
    const [allJobs, setAllJobs] = useState([]);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            if (user && user.role === 'admin') {
                try {
                    const data = await authService.getUsers(user.token);
                    setUsers(data);
                } catch (error) {
                    console.error("Failed to fetch users", error);
                }
            }
        };
        fetchUsers();
    }, [user]);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const data = await jobService.getJobs();
                setAllJobs(data);
            } catch (error) {
                console.error("Failed to fetch jobs", error);
            }
        };
        fetchAllJobs();
    }, []);

    useEffect(() => {
        const fetchApplications = async () => {
            if (user && user.role === 'admin') {
                try {
                    const data = await applicationService.getAllApplications(user.token);
                    setApplications(data);
                } catch (error) {
                    console.error("Failed to fetch applications", error);
                }
            }
        };
        fetchApplications();
    }, [user]);

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await authService.deleteUser(userId, user.token);
                setUsers(users.filter(u => u._id !== userId));
            } catch (error) {
                alert('Failed to delete user');
            }
        }
    };

    const handleDeleteJob = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await jobService.deleteJob(jobId, user.token);
                setAllJobs(allJobs.filter(j => j._id !== jobId));
            } catch (error) {
                alert('Failed to delete job');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 hidden md:flex flex-col">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-red-500 tracking-wider">ADMIN<span className="text-white">PANEL</span></h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-red-900/40 text-red-400 border-l-4 border-red-500' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                    >
                        <BarChart size={20} />
                        <span className="font-medium">Overview</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-red-900/40 text-red-400 border-l-4 border-red-500' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                    >
                        <Users size={20} />
                        <span className="font-medium">Users Management</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('jobs')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'jobs' ? 'bg-red-900/40 text-red-400 border-l-4 border-red-500' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                    >
                        <Briefcase size={20} />
                        <span className="font-medium">Jobs</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('applications')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'applications' ? 'bg-red-900/40 text-red-400 border-l-4 border-red-500' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                    >
                        <FileText size={20} />
                        <span className="font-medium">Applications</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-red-900/40 text-red-400 border-l-4 border-red-500' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                    >
                        <Settings size={20} />
                        <span className="font-medium">Settings</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-gray-800 border-b border-gray-700 p-6 shadow-md">
                    <h1 className="text-2xl font-semibold text-white">
                        {activeTab === 'overview' && 'Dashboard Overview'}
                        {activeTab === 'users' && 'User Management'}
                        {activeTab === 'jobs' && 'Job Listings'}
                        {activeTab === 'applications' && 'All Applications'}
                    </h1>
                </header>

                <div className="p-8">
                    {/* OVERVIEW TAB */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <Card className="bg-gray-800 border-gray-700">
                                <CardContent className="p-6 flex items-center space-x-4">
                                    <div className="p-3 rounded-full bg-blue-900/50 text-blue-400">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Total Users</p>
                                        <p className="text-3xl font-bold text-white">{users.length}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-gray-800 border-gray-700">
                                <CardContent className="p-6 flex items-center space-x-4">
                                    <div className="p-3 rounded-full bg-green-900/50 text-green-400">
                                        <Briefcase size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Active Jobs</p>
                                        <p className="text-3xl font-bold text-white">{allJobs.length}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-gray-800 border-gray-700">
                                <CardContent className="p-6 flex items-center space-x-4">
                                    <div className="p-3 rounded-full bg-purple-900/50 text-purple-400">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Applications</p>
                                        <p className="text-3xl font-bold text-white">{applications.length}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* USERS TAB */}
                    {activeTab === 'users' && (
                        <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-700 text-gray-400 text-sm uppercase">
                                                <th className="pb-3 px-4">Name</th>
                                                <th className="pb-3 px-4">Email</th>
                                                <th className="pb-3 px-4">Role</th>
                                                <th className="pb-3 px-4">Joined</th>
                                                <th className="pb-3 px-4">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-300">
                                            {users.map((user) => (
                                                <tr key={user._id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                                                    <td className="py-4 px-4 font-medium text-white">{user.name}</td>
                                                    <td className="py-4 px-4">{user.email}</td>
                                                    <td className="py-4 px-4 mb-2">
                                                        <span className={`px-2 py-1 rounded text-xs font-semibold
                                                            ${user.role === 'admin' ? 'bg-red-900 text-red-200' :
                                                                user.role === 'employer' ? 'bg-blue-900 text-blue-200' :
                                                                    'bg-green-900 text-green-200'}`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                                                    <td className="py-4 px-4">
                                                        <button onClick={() => handleDeleteUser(user._id)} className="text-gray-400 hover:text-red-500 transition-colors" title="Delete User">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* JOBS TAB */}
                    {activeTab === 'jobs' && (
                        <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-700 text-gray-400 text-sm uppercase">
                                                <th className="pb-3 px-4">Title</th>
                                                <th className="pb-3 px-4">Company</th>
                                                <th className="pb-3 px-4">Location</th>
                                                <th className="pb-3 px-4">Posted</th>
                                                <th className="pb-3 px-4">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-300">
                                            {allJobs.map((job) => (
                                                <tr key={job._id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                                                    <td className="py-4 px-4 font-medium text-white">{job.title}</td>
                                                    <td className="py-4 px-4">{job.company}</td>
                                                    <td className="py-4 px-4">{job.location}</td>
                                                    <td className="py-4 px-4">{new Date(job.createdAt).toLocaleDateString()}</td>
                                                    <td className="py-4 px-4">
                                                        <button onClick={() => handleDeleteJob(job._id)} className="text-gray-400 hover:text-red-500 transition-colors" title="Delete Job">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* APPLICATIONS TAB */}
                    {activeTab === 'applications' && (
                        <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-700 text-gray-400 text-sm uppercase">
                                                <th className="pb-3 px-4">Applicant</th>
                                                <th className="pb-3 px-4">Job Title</th>
                                                <th className="pb-3 px-4">Company</th>
                                                <th className="pb-3 px-4">Applied Date</th>
                                                <th className="pb-3 px-4">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-300">
                                            {applications.length > 0 ? (
                                                applications.map((app) => (
                                                    <tr key={app._id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                                                        <td className="py-4 px-4">
                                                            <div className="font-medium text-white">{app.applicant?.name || 'Unknown'}</div>
                                                            <div className="text-sm text-gray-500">{app.applicant?.email}</div>
                                                        </td>
                                                        <td className="py-4 px-4">{app.job?.title}</td>
                                                        <td className="py-4 px-4">{app.job?.company}</td>
                                                        <td className="py-4 px-4">{new Date(app.createdAt).toLocaleDateString()}</td>
                                                        <td className="py-4 px-4">
                                                            <a href={app.resumeLink} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">View Resume</a>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="py-8 text-center text-gray-500">No applications found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
