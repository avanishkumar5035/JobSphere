import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
    Users,
    Briefcase,
    TrendingUp,
    Layout,
    Settings,
    Search,
    CheckCircle,
    AlertCircle,
    ChevronRight,
    MoreVertical,
    ArrowUpRight,
    Zap,
    Bell,
    Shield,
    PieChart,
    BarChart3,
    Globe,
    Clock,
    FileText,
    Trash2,
    BarChart2 // Added back as it's used in the sidebar
} from 'lucide-react';
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            if (user && user.role === 'admin') {
                try {
                    setLoading(true);
                    const [usersData, jobsData, appsData] = await Promise.all([
                        authService.getUsers(user.token),
                        jobService.getJobs(),
                        applicationService.getAllApplications(user.token)
                    ]);
                    setUsers(usersData);
                    setAllJobs(jobsData);
                    setApplications(appsData);
                } catch (error) {
                    console.error("Failed to fetch admin data", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchAllData();
    }, [user]);

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user? This action is irreversible.')) {
            try {
                await authService.deleteUser(userId, user.token);
                setUsers(users.filter(u => u._id !== userId));
            } catch (error) {
                alert('Failed to delete user');
            }
        }
    };

    const handleDeleteJob = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job posting?')) {
            try {
                await jobService.deleteJob(jobId, user.token);
                setAllJobs(allJobs.filter(j => j._id !== jobId));
            } catch (error) {
                alert('Failed to delete job');
            }
        }
    };

    const stats = {
        users: users.length,
        jobs: allJobs.length,
        applications: applications.length,
        revenue: '12.4k' // Placeholder for now
    };

    return (
        <div className="min-h-screen bg-[#050505] text-gray-100 flex overflow-hidden">
            {/* Glassy Sidebar */}
            <aside className="w-80 bg-black/40 backdrop-blur-3xl border-r border-white/5 hidden xl:flex flex-col z-50">
                <div className="p-10">
                    <div className="flex items-center gap-3 group">
                        <div className="bg-primary p-2 rounded-xl transform group-hover:rotate-6 transition-transform shadow-lg shadow-primary/20">
                            <Briefcase className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-black text-white tracking-tighter">
                            Talent<span className="text-primary italic">Bridge</span>
                        </span>
                    </div>
                    <div className="mt-2 text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">Admin Control</div>
                </div>

                <nav className="flex-1 px-6 space-y-2">
                    {[
                        { id: 'overview', label: 'Command Center', icon: <BarChart2 size={20} /> },
                        { id: 'users', label: 'Talent Pool', icon: <Users size={20} /> },
                        { id: 'jobs', label: 'Job Inventory', icon: <Briefcase size={20} /> },
                        { id: 'applications', label: 'Submission Pipeline', icon: <FileText size={20} /> },
                        { id: 'settings', label: 'System Config', icon: <Settings size={20} /> },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-[20px] transition-all duration-300 relative group ${activeTab === tab.id
                                ? 'bg-primary/10 text-primary border border-primary/20'
                                : 'text-gray-500 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <span className={activeTab === tab.id ? 'text-primary' : 'text-gray-500 group-hover:text-white'}>{tab.icon}</span>
                            <span className="font-black uppercase tracking-widest text-[11px]">{tab.label}</span>
                            {activeTab === tab.id && (
                                <div className="absolute left-0 w-1 h-6 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--color-primary),0.5)]" />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-8 border-t border-white/5">
                    <div className="glass-card p-6 rounded-[24px] bg-gradient-to-br from-primary/10 to-transparent">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Server Region</p>
                        <p className="text-xs font-bold text-white">AWS US-East-1 (North Virginia)</p>
                    </div>
                </div>
            </aside>

            {/* Main Operational Area */}
            <main className="flex-1 overflow-y-auto relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] -z-10 opacity-50" />

                <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/5 px-10 py-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight">
                            {activeTab === 'overview' && 'Operational Intelligence'}
                            {activeTab === 'users' && 'Candidate Records'}
                            {activeTab === 'jobs' && 'Market Positions'}
                            {activeTab === 'applications' && 'Strategic Submissions'}
                            {activeTab === 'settings' && 'Global Configuration'}
                        </h1>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Live Telemetry & Management</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">System Nominal</span>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent p-0.5">
                            <div className="h-full w-full rounded-full bg-[#050505] flex items-center justify-center font-black text-xs">AD</div>
                        </div>
                    </div>
                </header>

                <div className="p-10 max-w-[1600px] mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40">
                            <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
                            <p className="text-xs font-black uppercase tracking-[0.4em] text-gray-600">Initializing Core Systems...</p>
                        </div>
                    ) : (
                        <>
                            {/* OVERVIEW TAB */}
                            {activeTab === 'overview' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="space-y-12"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                        {[
                                            { label: 'Total Users', value: stats.users, icon: <Users />, trend: '+12%', color: 'from-blue-500 to-indigo-600' },
                                            { label: 'Active Jobs', value: stats.jobs, icon: <Briefcase />, trend: '+5%', color: 'from-emerald-500 to-teal-600' },
                                            { label: 'Applications', value: stats.applications, icon: <Layout />, trend: '+18%', color: 'from-purple-500 to-pink-600' },
                                            { label: 'Revenue', value: stats.revenue, icon: <TrendingUp />, trend: '+24%', color: 'from-orange-500 to-amber-600' }
                                        ].map((item, i) => (
                                            <motion.div
                                                key={item.label}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                whileHover={{ y: -5 }}
                                                className="glass-card p-8 rounded-[32px] border-none shadow-premium relative overflow-hidden group"
                                            >
                                                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-5 blur-2xl -mr-8 -mt-8 group-hover:opacity-10 transition-opacity`} />
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                                                        {item.icon}
                                                    </div>
                                                    <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-lg uppercase tracking-widest">{item.trend}</span>
                                                </div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                                                <h4 className="text-3xl font-black text-white tracking-tight">{item.value}</h4>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-2 glass-card p-10 rounded-[40px] border-none shadow-premium bg-black/20">
                                            <div className="flex items-center justify-between mb-10">
                                                <div>
                                                    <h3 className="text-xl font-black text-white tracking-tight">System Traffic</h3>
                                                    <p className="text-sm text-gray-500 font-medium">Real-time performance metrics</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Live Node</span>
                                                </div>
                                            </div>
                                            <div className="h-[300px] flex items-end gap-3 px-4">
                                                {[40, 60, 45, 90, 65, 80, 55, 70, 85, 50, 75, 95].map((h, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${h}%` }}
                                                        transition={{ delay: i * 0.05, duration: 1, ease: "easeOut" }}
                                                        className="flex-1 bg-gradient-to-t from-primary/10 via-primary/40 to-primary rounded-t-lg group relative"
                                                    >
                                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">{h}%</div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <div className="flex justify-between mt-6 px-2">
                                                {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'].map(t => (
                                                    <span key={t} className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{t}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="glass-card p-10 rounded-[40px] border-none shadow-premium bg-gradient-to-br from-primary/10 to-transparent">
                                            <h3 className="text-xl font-black text-white tracking-tight mb-8">Recent Alerts</h3>
                                            <div className="space-y-6">
                                                {[
                                                    { text: 'Server load spike detected in AP-South', type: 'warning' },
                                                    { text: 'New employer account: Nexus Corp', type: 'info' },
                                                    { text: 'Database backup successful', type: 'success' },
                                                    { text: 'SSL certificate expiring in 12 days', type: 'alert' }
                                                ].map((alert, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.5 + (i * 0.1) }}
                                                        className="flex gap-4 group cursor-default"
                                                    >
                                                        <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0 group-hover:scale-150 transition-transform" />
                                                        <p className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors leading-relaxed">{alert.text}</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <Button className="w-full mt-10 rounded-2xl h-14 bg-white/5 hover:bg-white/10 text-white font-black text-xs uppercase tracking-widest border border-white/5">View All Logs</Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* USERS TAB */}
                            {activeTab === 'users' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="glass-card rounded-[40px] border border-white/5 overflow-hidden shadow-premium"
                                >
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                                                    <th className="py-8 px-10">Candidate Identity</th>
                                                    <th className="py-8 px-10">Classification</th>
                                                    <th className="py-8 px-10">Lifecycle Date</th>
                                                    <th className="py-8 px-10">Security Status</th>
                                                    <th className="py-8 px-10 text-right">Operations</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {users.map((item) => (
                                                    <tr key={item._id} className="hover:bg-white/[0.02] transition-colors group">
                                                        <td className="py-8 px-10">
                                                            <div className="flex items-center gap-5">
                                                                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center font-black text-primary">
                                                                    {item.name.charAt(0)}
                                                                </div>
                                                                <div>
                                                                    <div className="text-lg font-black text-white group-hover:text-primary transition-colors">{item.name}</div>
                                                                    <div className="text-xs font-bold text-gray-500">{item.email}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-8 px-10">
                                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${item.role === 'admin' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                                item.role === 'employer' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                                    'bg-green-500/10 text-green-500 border-green-500/20'
                                                                }`}>
                                                                {item.role}
                                                            </span>
                                                        </td>
                                                        <td className="py-8 px-10 text-sm font-bold text-gray-400">
                                                            {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </td>
                                                        <td className="py-8 px-10">
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Verified</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-8 px-10 text-right">
                                                            <button
                                                                onClick={() => handleDeleteUser(item._id)}
                                                                className="h-10 w-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all ml-auto"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>
                            )}

                            {/* JOBS TAB - Simplified for brevity */}
                            {activeTab === 'jobs' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {allJobs.map((job) => (
                                        <div key={job._id} className="glass-card p-8 rounded-[40px] border border-white/5 hover:border-primary/20 transition-all group shadow-premium relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                                                <Briefcase className="h-20 w-20 text-white" />
                                            </div>
                                            <div className="relative z-10">
                                                <h4 className="text-xl font-black text-white mb-2 leading-tight">{job.title}</h4>
                                                <p className="text-xs font-black text-primary uppercase tracking-widest mb-6">{job.company}</p>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{job.location}</span>
                                                    <button
                                                        onClick={() => handleDeleteJob(job._id)}
                                                        className="text-red-500 hover:text-red-400 transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {/* SETTINGS TAB */}
                            {activeTab === 'settings' && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="max-w-2xl space-y-12"
                                >
                                    <section>
                                        <h3 className="text-xl font-black text-white mb-8 border-l-4 border-primary pl-6">Core Configuration</h3>
                                        <div className="space-y-6">
                                            {[
                                                { label: 'System Access Key', value: 'TB-ADMIN-0019283-X', type: 'text' },
                                                { label: 'Default Pagination', value: '25', type: 'number' },
                                                { label: 'API Rate Limit (rpm)', value: '1000', type: 'number' }
                                            ].map(field => (
                                                <div key={field.label}>
                                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">{field.label}</label>
                                                    <input
                                                        type={field.type}
                                                        defaultValue={field.value}
                                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/50 transition-all font-bold"
                                                    />
                                                </div>
                                            ))}
                                            <Button className="rounded-2xl h-14 px-10 font-black uppercase tracking-widest text-[10px] bg-primary shadow-lg shadow-primary/20">Commit Changes</Button>
                                        </div>
                                    </section>
                                </motion.div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
