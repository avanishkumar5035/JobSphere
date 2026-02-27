import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
    Briefcase,
    Clock,
    CheckCircle,
    AlertCircle,
    ChevronRight,
    Star,
    TrendingUp,
    Users,
    Building,
    ExternalLink,
    Search,
    Bookmark,
    Bell,
    Settings,
    User,
    ChevronDown,
    Zap,
    MapPin,
    ArrowRight,
    ShieldCheck,
    Target,
    Layout
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import applicationService from '../../features/applications/applicationService';

const statusStyles = {
    applied: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
    reviewing: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
    shortlisted: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
    rejected: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
    hired: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800'
};

const SeekerDashboard = () => {
    const { user } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyApplications = async () => {
            try {
                if (user) {
                    const data = await applicationService.getMyApplications();
                    setApplications(data);
                }
            } catch (error) {
                console.error("Failed to fetch applications", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyApplications();
    }, [user]);

    const savedJobsCount = 0; // Mock for now
    const interviewCount = applications.filter(app => app.status === 'shortlisted' || app.status === 'hired').length;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Welcome Messenger */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16"
                >
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4"
                        >
                            <Zap className="h-3 w-3 fill-primary" /> System Online
                        </motion.div>
                        <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
                            Welcome back, <span className="text-gradient">{user?.name}</span>.
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-4 text-xl font-medium">Your career trajectory is looking strong today.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="h-14 w-14 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center border border-gray-100 dark:border-gray-800 hover:scale-105 transition-transform">
                            <Bell className="h-6 w-6 text-gray-400" />
                        </button>
                        <button className="h-14 w-14 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center border border-gray-100 dark:border-gray-800 hover:scale-105 transition-transform">
                            <Settings className="h-6 w-6 text-gray-400" />
                        </button>
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
                                <h4 className="text-lg font-black text-amber-900 dark:text-amber-100">Verify your mobile number</h4>
                                <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Increase your account security and visibility to recruiters by verifying your contact info.</p>
                            </div>
                        </div>
                        <Link to="/verify-mobile" className="w-full md:w-auto">
                            <Button size="lg" className="w-full md:w-auto rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black px-8">
                                Verify Now
                            </Button>
                        </Link>
                    </motion.div>
                )}

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="lg:col-span-1 space-y-10"
                    >
                        <div className="glass-card p-10 rounded-[48px] border-none shadow-premium relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                                <TrendingUp className="h-32 w-32 text-primary" />
                            </div>
                            <div className="relative z-10">
                                <div className="relative h-24 w-24 mb-6">
                                    <svg className="h-full w-full transform -rotate-90">
                                        <circle cx="48" cy="48" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-gray-100 dark:text-gray-800" />
                                        <motion.circle
                                            cx="48" cy="48" r="40" fill="transparent" stroke="currentColor" strokeWidth="8"
                                            strokeDasharray={251.2}
                                            initial={{ strokeDashoffset: 251.2 }}
                                            animate={{ strokeDashoffset: 251.2 * (1 - 0.85) }}
                                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                            className="text-primary"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center font-black text-2xl text-gray-900 dark:text-white">85%</div>
                                </div>
                                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">Profile Strength</h4>
                                <p className="text-gray-500 font-medium text-sm mb-8 italic">"You're in the top 5% for your role."</p>
                                <Button className="w-full rounded-2xl h-14 font-black shadow-lg shadow-primary/10 premium-button">Optimize Profile</Button>
                            </div>
                        </div>

                        <div className="glass-card p-8 rounded-[40px] bg-accent/5 dark:bg-accent/10 border-none shadow-premium">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">AI Career Insight</h3>
                            <div className="flex gap-4">
                                <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                                    <Star className="h-5 w-5 text-accent-dark" />
                                </div>
                                <p className="text-sm font-bold text-accent-dark italic leading-relaxed">"Adding 'Cloud Infrastructure' to your skills could increase your match rate by 40%."</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="lg:col-span-2"
                    >
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Active Applications</h2>
                            <Link to="/jobs">
                                <Button variant="ghost" className="text-primary font-black uppercase tracking-widest text-[10px] gap-2">Explore More <ArrowRight className="h-3 w-3" /></Button>
                            </Link>
                        </div>

                        {loading ? (
                            <div className="p-20 text-center flex flex-col items-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                                <p className="text-gray-500 font-medium">Synching with global talent nodes...</p>
                            </div>
                        ) : applications.length > 0 ? (
                            <div className="space-y-8">
                                {applications.map((app, i) => (
                                    <motion.div
                                        key={app._id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 + 0.5 }}
                                    >
                                        <div className="glass-card p-2 rounded-[32px] hover:shadow-xl transition-all duration-500 border-none">
                                            <div className="p-8 bg-white dark:bg-gray-900 rounded-[30px] border border-gray-50 dark:border-gray-800">
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                                                    <div className="flex items-center gap-6">
                                                        <div className="h-16 w-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-gray-700">
                                                            <img
                                                                src={app.job?.companyLogo || "https://cdn-icons-png.flaticon.com/512/281/281764.png"}
                                                                alt={app.job?.company}
                                                                className="h-12 w-12 object-contain rounded-xl"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
                                                                <Link to={`/jobs/${app.job?._id}`} className="hover:text-primary transition-colors">{app.job?.title}</Link>
                                                            </h3>
                                                            <p className="text-gray-500 dark:text-gray-400 font-bold text-sm mt-1 mb-3 flex items-center gap-2 uppercase tracking-widest">
                                                                {app.job?.company} <span className="text-gray-300">•</span> <MapPin className="h-3 w-3 inline" /> {app.job?.location}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="w-full sm:w-auto">
                                                        <span className={`inline-flex px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] border shadow-sm ${app.status === 'hired' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                            app.status === 'shortlisted' ? 'bg-green-50 text-green-600 border-green-100' :
                                                                app.status === 'reviewing' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                                    'bg-blue-50 text-blue-600 border-blue-100'
                                                            }`}>
                                                            {app.status || 'Received'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Modern Status Tracker Line */}
                                                <div className="relative pt-6 px-2">
                                                    <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{
                                                                width:
                                                                    app.status === 'hired' ? '100%' :
                                                                        app.status === 'shortlisted' ? '66%' :
                                                                            app.status === 'reviewing' ? '33%' :
                                                                                '10%'
                                                            }}
                                                            transition={{ duration: 1.5, ease: "easeInOut" }}
                                                            className={`h-full ${app.status === 'hired' ? 'bg-purple-500' :
                                                                app.status === 'shortlisted' ? 'bg-green-500' :
                                                                    app.status === 'reviewing' ? 'bg-amber-500' :
                                                                        'bg-blue-500'
                                                                }`}
                                                        />
                                                    </div>
                                                    <div className="flex justify-between mt-4">
                                                        {['Applied', 'Reviewing', 'Interview', 'Decision'].map((step, i) => (
                                                            <div key={step} className="flex flex-col items-center gap-2">
                                                                <div className={`h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${(i === 0) ||
                                                                    (i === 1 && (app.status === 'reviewing' || app.status === 'shortlisted' || app.status === 'hired')) ||
                                                                    (i === 2 && (app.status === 'shortlisted' || app.status === 'hired')) ||
                                                                    (i === 3 && (app.status === 'hired' || app.status === 'rejected'))
                                                                    ? 'bg-primary ring-4 ring-primary/20' : 'bg-gray-200 dark:bg-gray-700'
                                                                    }`} />
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{step}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="glass-card p-20 text-center border-none shadow-premium bg-gray-50/50 dark:bg-gray-900/50 rounded-[56px]">
                                <Briefcase className="h-16 w-16 text-gray-200 mx-auto mb-6" />
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white">No active applications</h3>
                                <p className="text-gray-500 font-medium mt-4">Start your journey today.</p>
                                <Link to="/jobs">
                                    <Button className="mt-8 rounded-2xl h-14 px-10 font-black">Browse All Jobs</Button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* AI & Alerts row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Skill Gaps</h2>
                        <div className="glass-card p-10 rounded-[48px] bg-gradient-to-br from-primary/5 to-transparent">
                            <p className="text-gray-500 font-medium mb-8">Recruiters searching for your role often look for these skills:</p>
                            <div className="flex flex-wrap gap-4">
                                {['Cloud Architecture', 'System Design', 'Team Leadership', 'FastAPI'].map(skill => (
                                    <span key={skill} className="px-5 py-2.5 rounded-2xl bg-white dark:bg-gray-800 text-xs font-black text-primary border border-primary/10">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">System Notifications</h2>
                        <div className="space-y-4">
                            {[
                                { title: 'New Job Match', text: 'Senior Dev at Google', time: '2h ago' },
                                { title: 'Application Viewed', text: 'Nexus Corp viewed your profile', time: '1d ago' }
                            ].map((note, i) => (
                                <div key={i} className="flex gap-6 p-6 rounded-[32px] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <Bell className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-900 dark:text-white">{note.title}</p>
                                        <p className="text-sm text-gray-500 font-medium">{note.text}</p>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{note.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SeekerDashboard;
