import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Link, useNavigate } from 'react-router-dom';
import JobCard from '../components/shared/JobCard';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, DollarSign, ChevronRight, Building2, TrendingUp, BookOpen, Zap, Star, Building, GraduationCap } from 'lucide-react';
import jobService from '../features/jobs/jobService';

const Home = () => {
    const [featuredJobs, setFeaturedJobs] = useState([]);
    const [latestJobs, setLatestJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await jobService.getJobs();
                if (data) {
                    setFeaturedJobs(data.slice(0, 4));
                    setLatestJobs(data.slice(0, 5));
                }
            } catch (error) {
                console.error("Failed to fetch jobs", error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] mb-8"
                        >
                            <Zap className="h-3 w-3 fill-primary" /> The future of recruitment is here
                        </motion.div>
                        <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight mb-8">
                            Find your <span className="text-gradient">dream career</span> <br className="hidden md:block" /> with TalentBridge.
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 font-medium">
                            Join over 2 million professionals and 50,000+ top companies building the world's most innovative teams.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Smart Search Bar */}
                        <div className="glass-card p-2 rounded-[32px] max-w-5xl mx-auto mb-12 shadow-2xl flex flex-col md:flex-row items-center gap-2 group transition-all duration-500 hover:shadow-primary/20">
                            <div className="flex-1 w-full flex items-center px-6 py-4 bg-white/5 dark:bg-black/20 rounded-[24px] focus-within:bg-white/10 transition-colors">
                                <Search className="h-6 w-6 text-accent mr-4" />
                                <div className="flex-1 text-left">
                                    <label className="block text-[10px] uppercase tracking-widest font-black text-gray-500 mb-0.5">What are you looking for?</label>
                                    <Input
                                        placeholder="Skill, Designations, Companies"
                                        className="border-0 p-0 shadow-none focus-visible:ring-0 bg-transparent text-white placeholder-gray-600 h-auto text-lg font-semibold"
                                    />
                                </div>
                            </div>

                            <div className="hidden md:block w-px h-12 bg-white/10" />

                            <div className="flex-1 w-full flex items-center px-6 py-4 bg-white/5 dark:bg-black/20 rounded-[24px] focus-within:bg-white/10 transition-colors">
                                <MapPin className="h-6 w-6 text-accent mr-4" />
                                <div className="flex-1 text-left">
                                    <label className="block text-[10px] uppercase tracking-widest font-black text-gray-500 mb-0.5">Where?</label>
                                    <Input
                                        placeholder="Enter location or 'Remote'"
                                        className="border-0 p-0 shadow-none focus-visible:ring-0 bg-transparent text-white placeholder-gray-600 h-auto text-lg font-semibold"
                                    />
                                </div>
                            </div>

                            <Button size="lg" className="w-full md:w-auto px-12 h-[72px] text-xl font-black rounded-[24px] shadow-xl shadow-primary/40 bg-primary hover:bg-primary-dark premium-button group" onClick={() => navigate('/jobs')}>
                                Search Jobs
                                <ChevronRight className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <span className="text-gray-500 font-bold uppercase tracking-widest py-2">Trending:</span>
                            {['Remote', 'MNC', 'Software', 'Design', 'Marketing', 'Banking'].map((tag) => (
                                <button key={tag} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-accent hover:text-white transition-all font-bold cursor-pointer">
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Companies Section */}
            <section className="py-20 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-900 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <p className="text-center text-gray-400 font-black uppercase tracking-[0.2em] text-xs mb-10">Trusted by Global Industry Leaders</p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale group"
                    >
                        {['Google', 'Microsoft', 'Amazon', 'Netflix', 'Meta'].map((brand) => (
                            <span key={brand} className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white hover:text-primary hover:grayscale-0 transition-all cursor-default">{brand}</span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Featured Sections (Grid) */}
            <section className="py-24 bg-gray-50/50 dark:bg-gray-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'Remote Jobs', icon: <Building className="h-6 w-6" />, count: '12.5k+', color: 'bg-blue-500' },
                            { title: 'MNCs', icon: <Star className="h-6 w-6" />, count: '800+', color: 'bg-yellow-500' },
                            { title: 'Software', icon: <Zap className="h-6 w-6" />, count: '45k+', color: 'bg-purple-500' },
                            { title: 'Internships', icon: <GraduationCap className="h-6 w-6" />, count: '5k+', color: 'bg-emerald-500' }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 hover:scale-105 transition-transform cursor-pointer group"
                            >
                                <div className={`h-12 w-12 rounded-2xl ${item.color} text-white flex items-center justify-center mb-6 shadow-lg shadow-${item.color.split('-')[1]}-500/20 group-hover:rotate-6 transition-transform`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">{item.title}</h3>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{item.count} Openings</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Opportunities */}
            <section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Featured Opportunities</h2>
                                <Link to="/jobs">
                                    <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5 rounded-xl">Explore All Jobs</Button>
                                </Link>
                            </div>
                            <div className="grid gap-6">
                                {featuredJobs && featuredJobs.length > 0 ? (
                                    featuredJobs.map((job, i) => (
                                        <motion.div
                                            key={job._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <JobCard job={job} />
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
                                        <p className="text-gray-400 font-bold uppercase tracking-widest">No featured jobs available</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        <div className="space-y-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="glass-card p-10 rounded-[40px] border-none shadow-premium bg-gradient-to-br from-primary/10 to-accent/5"
                            >
                                <TrendingUp className="h-12 w-12 text-primary mb-6" />
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Salary Insights</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium">Research market rates for your role and negotiate with confidence.</p>
                                <Button className="w-full bg-primary hover:bg-primary-dark rounded-2xl h-14 font-black">Check Salaries</Button>
                            </motion.div>

                            <div className="bg-white dark:bg-gray-800 p-10 rounded-[40px] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 bg-accent/10 rounded-2xl">
                                        <BookOpen className="h-6 w-6 text-accent" />
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white">Career Guidance</h3>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        'How to crack technical interviews',
                                        'Writing a 10/10 ATS resume',
                                        'Negotiating your remote salary',
                                        'Mastering public speaking for PMs'
                                    ].map((tip, i) => (
                                        <Link key={i} to="/resources" className="group flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-700 last:border-0">
                                            <span className="text-gray-600 dark:text-gray-300 font-bold group-hover:text-primary transition-colors">{tip}</span>
                                            <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Professional Postings */}
            <section className="py-32 bg-white dark:bg-gray-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Real-time Postings</Badge>
                        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">Latest Professional Postings</h2>
                        <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg font-medium">Updated minutes ago. Secure your next career move today.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {latestJobs && latestJobs.length > 0 ? (
                            latestJobs.map((job) => (
                                <div key={job._id} className="group bg-gray-50 dark:bg-gray-900/40 rounded-[40px] p-10 border border-gray-100 dark:border-gray-800 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8">
                                        <Badge variant="outline" className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border-gray-200 text-gray-400 bg-white dark:bg-gray-800">
                                            {job.type}
                                        </Badge>
                                    </div>
                                    <div className="mb-8">
                                        <div className="h-16 w-16 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm text-2xl font-black text-primary border border-gray-100 dark:border-gray-700 transition-transform group-hover:scale-110 duration-500">
                                            {job.company.charAt(0)}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors leading-tight">{job.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-bold text-sm mb-8 uppercase tracking-widest">{job.company}</p>

                                    <div className="flex flex-wrap gap-3 mb-10">
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[10px] font-black uppercase tracking-wider">
                                            <DollarSign className="h-3 w-3" /> {job.salary}
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider">
                                            <MapPin className="h-3 w-3" /> {job.location}
                                        </div>
                                    </div>

                                    <Button className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-primary hover:text-white hover:border-primary rounded-2xl h-14 font-black shadow-sm transition-all duration-300">
                                        Apply Now
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-[40px] border-2 border-dashed border-gray-200 dark:border-gray-800">
                                <p className="text-gray-400 font-bold uppercase tracking-widest">Stay tuned for new postings</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-20 text-center">
                        <Link to="/jobs">
                            <Button size="lg" className="rounded-[24px] px-12 h-16 bg-primary hover:bg-primary-dark text-white font-black text-xl shadow-xl shadow-primary/20 premium-button">
                                Browse 5,000+ More Jobs
                                <ChevronRight className="h-6 w-6 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 bg-[#0f172a] relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15)_0%,transparent_70%)]" />
                </div>
                <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
                    <Badge className="mb-8 bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1 font-black uppercase tracking-widest">Join the Future of Work</Badge>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tight leading-tight">Ready to Elevate Your Professional Career?</h2>
                    <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
                        Join 2 million+ professionals who have already found their dream roles at TalentBridge.
                        Your next big opportunity is just a click away.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button size="lg" className="bg-primary hover:bg-primary-dark text-white font-black text-xl px-12 h-20 rounded-[28px] shadow-2xl shadow-primary/30 premium-button" onClick={() => navigate('/register')}>
                            Get Started Free
                        </Button>
                        <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/5 font-black text-xl px-12 h-20 rounded-[28px] backdrop-blur-sm transition-all" onClick={() => navigate('/login')}>
                            Post Hiring Need
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
