import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Briefcase,
    TrendingUp,
    Plus,
    Search,
    ChevronRight,
    MapPin,
    Clock,
    CheckCircle,
    AlertCircle,
    ExternalLink,
    Filter,
    ArrowRight,
    Building,
    Zap,
    Bell,
    Settings,
    FileText
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import jobService from '../../features/jobs/jobService';
import applicationService from '../../features/applications/applicationService';

const EmployerDashboard = () => {
    const { user } = useContext(AuthContext);
    const [postedJobs, setPostedJobs] = useState([]);
    const [allApplications, setAllApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployerData = async () => {
            try {
                if (user && user._id) {
                    const [jobs, applications] = await Promise.all([
                        jobService.getJobs(),
                        applicationService.getAllApplications() // Admin can see all, but here we'll filter
                    ]);

                    const employerJobs = jobs.filter(job => job.postedBy?._id === user._id || job.postedBy === user._id);
                    setPostedJobs(employerJobs);

                    // Filter applications for jobs posted by this employer
                    const jobIds = new Set(employerJobs.map(j => j._id));
                    const employerApps = applications.filter(app => jobIds.has(app.job?._id || app.job));
                    setAllApplications(employerApps);
                }
            } catch (error) {
                console.error("Failed to fetch employer data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployerData();
    }, [user]);

    const getApplicantCountForJob = (jobId) => {
        return allApplications.filter(app => (app.job?._id || app.job) === jobId).length;
    };

    const hiredCount = allApplications.filter(app => app.status === 'hired').length;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12"
                >
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4"
                        >
                            <Zap className="h-3 w-3 fill-primary" /> Employer Mode
                        </motion.div>
                        <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
                            Build your <span className="text-gradient">world-class team</span> today.
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-4 text-xl font-medium">Manage your professional pipeline and track candidate performance.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/post-job" className="w-full sm:w-auto">
                            <Button size="lg" className="h-14 px-10 rounded-2xl font-black shadow-xl shadow-primary/20 premium-button gap-2">
                                <Plus className="h-5 w-5" /> Post New Role
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Mobile Verification Reminder */}
                {!user?.mobileVerified && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 p-6 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                <AlertCircle className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-amber-900 dark:text-amber-100">Complete your verification</h4>
                                <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Verify your mobile number to establish trust with potential candidates.</p>
                            </div>
                        </div>
                        <Link to="/verify-mobile" className="w-full md:w-auto">
                            <Button size="lg" className="w-full md:w-auto rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black px-8">
                                Verify Now
                            </Button>
                        </Link>
                    </motion.div>
                )}

                {/* Analytics Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="lg:col-span-1"
                    >
                        <div className="glass-card p-10 rounded-[40px] border-none shadow-premium bg-gradient-to-br from-primary/10 to-accent/5 relative overflow-hidden group h-full">
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                                <TrendingUp className="h-32 w-32 text-primary" />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8">Hiring Velocity</h3>
                                <div className="space-y-8">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">Active Roles</p>
                                            <p className="text-5xl font-black text-gray-900 dark:text-white">{postedJobs.length}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-green-500 font-black text-xs uppercase tracking-widest mb-1">+12% vs last month</p>
                                            <div className="h-1.5 w-24 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '75%' }}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                    className="h-full bg-green-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/50 dark:bg-black/20 p-6 rounded-3xl border border-white/50 dark:border-white/5">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Applicants</p>
                                            <p className="text-2xl font-black text-gray-900 dark:text-white">{allApplications.length}</p>
                                        </div>
                                        <div className="bg-white/50 dark:bg-black/20 p-6 rounded-3xl border border-white/50 dark:border-white/5">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Time to Hire</p>
                                            <p className="text-2xl font-black text-gray-900 dark:text-white">18d</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="lg:col-span-2"
                    >
                        <div className="glass-card p-10 rounded-[40px] border-none shadow-premium h-full bg-white dark:bg-gray-900/40">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black text-gray-900 dark:text-white">Pipeline Overview</h3>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-[10px] font-black text-blue-600 uppercase tracking-widest">Sourcing</span>
                                    <span className="px-3 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 text-[10px] font-black text-green-600 uppercase tracking-widest">Interview</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Top Talent Pool</p>
                                    {[1, 2, 3].map((_, i) => (
                                        <div key={i} className="flex items-center gap-4 group cursor-pointer p-2 -m-2 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <div className="h-12 w-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                                                <Users className="h-6 w-6 text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Candidate #{100 + i}</p>
                                                <p className="text-xs text-gray-500">Match Score: <span className="text-green-500 font-bold">94%</span></p>
                                            </div>
                                            <ChevronRight className="h-4 w-4 ml-auto text-gray-300 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col justify-center items-center text-center p-8 bg-primary/5 rounded-[32px] border border-primary/10">
                                    <div className="h-16 w-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center mb-4">
                                        <Zap className="h-8 w-8 text-primary" />
                                    </div>
                                    <h4 className="font-black text-gray-900 dark:text-white mb-2">AI Recruiter™</h4>
                                    <p className="text-sm text-gray-500 font-medium mb-6">Let our AI find the best candidates for your open roles.</p>
                                    <Button variant="outline" className="rounded-xl border-primary/20 text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all">Activate Assistant</Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">Your Active Postings</h2>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search postings..."
                                className="pl-12 pr-6 h-12 rounded-2xl bg-gray-50 dark:bg-gray-900 border-none w-64 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                        <Button variant="outline" className="h-12 w-12 rounded-2xl border-none bg-gray-50 dark:bg-gray-800 p-0 flex items-center justify-center">
                            <Filter className="h-5 w-5 text-gray-400" />
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <div className="p-20 text-center flex flex-col items-center">
                        <div className="animate-spin rounded-[50%] h-16 w-16 border-t-4 border-primary border-r-4 border-r-transparent mb-6 transition-all"></div>
                        <p className="text-gray-500 dark:text-gray-400 font-black uppercase tracking-[0.2em] text-xs">Architecting your professional portfolio...</p>
                    </div>
                ) : postedJobs.length > 0 ? (
                    <div className="divide-y divide-gray-50 dark:divide-gray-800">
                        {postedJobs.map((job) => (
                            <div key={job._id} className="px-10 py-12 flex flex-col lg:flex-row lg:items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-all duration-500 gap-10 group relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
                                <div className="flex-grow max-w-2xl">
                                    <div className="flex items-start gap-6">
                                        <div className="h-16 w-16 bg-white dark:bg-gray-700 rounded-[28px] flex items-center justify-center text-primary font-black text-2xl shadow-sm border border-gray-100 dark:border-gray-600 transition-transform group-hover:scale-110 duration-500">
                                            {job.title.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-gray-900 dark:text-white text-3xl tracking-tight leading-none mb-3">
                                                {job.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-4 text-xs font-black uppercase tracking-widest mt-4">
                                                <span className="text-primary bg-primary/10 px-4 py-2 rounded-xl flex items-center gap-2">
                                                    <Zap className="h-3 w-3" /> {job.workMode || 'On-site'}
                                                </span>
                                                <span className="text-gray-400 border border-gray-100 dark:border-gray-700 px-4 py-2 rounded-xl flex items-center gap-1.5 bg-white dark:bg-gray-800">
                                                    <MapPin className="h-3 w-3" /> {job.location}
                                                </span>
                                                <span className="text-gray-400 px-4 py-2 rounded-xl flex items-center gap-2">
                                                    <Clock className="h-3 w-3" /> {new Date(job.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-10 lg:ml-auto shrink-0">
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <span className="block text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none mb-1">{getApplicantCountForJob(job._id)}</span>
                                            <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Candidates</span>
                                        </div>
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-black">
                                                    {i === 3 ? '+2' : <Users className="h-4 w-4 text-gray-400" />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button
                                            onClick={() => navigate(`/dashboard/manage-applicants/${job._id}`)}
                                            className="rounded-[20px] px-8 h-14 font-black shadow-xl shadow-primary/20 bg-primary hover:bg-primary-dark premium-button"
                                        >
                                            Manage Pipeline
                                        </Button>
                                        <Button variant="ghost" className="rounded-[20px] w-14 h-14 p-0 text-gray-400 border border-gray-100 dark:border-gray-800 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all group/edit">
                                            <ExternalLink className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-24 text-center flex flex-col items-center justify-center">
                        <div className="h-24 w-24 bg-gray-50 dark:bg-gray-800 rounded-[32px] flex items-center justify-center mb-6 border border-gray-100 dark:border-gray-700 relative">
                            <FileText className="h-10 w-10 text-gray-300 dark:text-gray-600" />
                            <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white dark:border-gray-800">
                                <Plus className="h-4 w-4" />
                            </div>
                        </div>
                        <h3 className="text-gray-900 dark:text-white font-black text-2xl mb-3">Your portfolio is currently empty</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-sm font-medium">Capture the best talent by posting your first job opening today. It takes less than 2 minutes.</p>
                        <Link to="/post-job">
                            <Button size="lg" className="rounded-2xl px-10 h-14 shadow-xl shadow-primary/30 gap-3 font-black text-lg">
                                <Plus className="h-6 w-6" /> Create First Job Posting
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployerDashboard;
