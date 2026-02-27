import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, FileText, Video, PlayCircle, Download, ChevronRight, Star, TrendingUp, Search, Compass, BookOpenCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';

// Expanded Data for Resources
const ALL_GUIDES = [
    {
        id: 1,
        title: "The 2024 Tech Interview Playbook",
        description: "Master system design, algorithms, and behavioral questions with strategies top-tier companies actually look for.",
        category: "Interview Prep",
        readTime: "15 min read",
        icon: <BookOpenCheck className="h-6 w-6 text-primary" />,
        color: "bg-blue-500/10 border-blue-500/20 text-blue-500",
        rating: 4.9
    },
    {
        id: 2,
        title: "Negotiating Like a Pro: Salary Secrets",
        description: "Learn the exact scripts and psychological triggers to increase your initial offer by up to 20% without risking the role.",
        category: "Salary Negotiation",
        readTime: "8 min read",
        icon: <TrendingUp className="h-6 w-6 text-emerald-500" />,
        color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
        rating: 4.8
    },
    {
        id: 3,
        title: "Resume Templates That Pass ATS",
        description: "Download verified, ATS-friendly resume templates used by candidates who secured roles at FAANG.",
        category: "Resume Building",
        readTime: "Template",
        icon: <FileText className="h-6 w-6 text-purple-500" />,
        color: "bg-purple-500/10 border-purple-500/20 text-purple-500",
        rating: 4.9
    },
    {
        id: 4,
        title: "System Design Framework",
        description: "A step-by-step framework to approach any scalable system design interview question confidently.",
        category: "Technical Assessments",
        readTime: "20 min read",
        icon: <Video className="h-6 w-6 text-orange-500" />,
        color: "bg-orange-500/10 border-orange-500/20 text-orange-500",
        rating: 4.7
    },
    {
        id: 5,
        title: "Cold Emailing for Referrals",
        description: "Proven email templates to get referrals from employees at your target companies.",
        category: "Networking Strategies",
        readTime: "10 min read",
        icon: <Compass className="h-6 w-6 text-pink-500" />,
        color: "bg-pink-500/10 border-pink-500/20 text-pink-500",
        rating: 4.6
    }
];

const CATEGORIES = [
    { name: 'All', icon: <BookOpen size={20} />, count: 5 },
    { name: 'Interview Prep', icon: <Video size={20} />, count: 124 },
    { name: 'Resume Building', icon: <FileText size={20} />, count: 56 },
    { name: 'Salary Negotiation', icon: <TrendingUp size={20} />, count: 42 },
    { name: 'Networking Strategies', icon: <Compass size={20} />, count: 89 },
    { name: 'Technical Assessments', icon: <BookOpenCheck size={20} />, count: 210 },
];

const Resources = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    // Filter guides based on search query and active category
    const filteredGuides = ALL_GUIDES.filter(guide => {
        const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guide.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || guide.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAction = (actionName) => {
        alert(`${actionName} - This resource is being compiled! Check back soon or check your email.`);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 transition-colors py-12">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] -z-10 opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] -z-10 opacity-50 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Hero Section */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-black text-[10px] uppercase tracking-widest mb-6 border border-primary/20">
                            <Star className="h-3 w-3" /> Professional Development
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter leading-tight">
                            Elevate Your <span className="text-primary italic">Career Graph</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-10">
                            Exclusive playbooks, inside strategies, and toolkits curated by industry leaders to help you land your dream role.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-14 pr-32 py-5 bg-white dark:bg-gray-800/80 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-[32px] text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-2xl shadow-black/5 font-medium text-lg"
                                placeholder="Search playbooks, templates, guides..."
                            />
                            <div className="absolute inset-y-0 right-3 flex items-center">
                                <Button
                                    onClick={() => alert('Search applied!')}
                                    className="h-12 px-8 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20"
                                >
                                    Search Hub
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Categories Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20"
                >
                    {CATEGORIES.map((cat, i) => (
                        <div
                            key={i}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`bg-white dark:bg-gray-800/40 backdrop-blur-md border ${activeCategory === cat.name
                                    ? 'border-primary ring-2 ring-primary/20 shadow-primary/10'
                                    : 'border-gray-100 dark:border-white/5 hover:border-primary/30'
                                } p-6 rounded-[32px] transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg shadow-black/5 flex flex-col items-center text-center text-gray-900 dark:text-white`}
                        >
                            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${activeCategory === cat.name
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-50 dark:bg-gray-900/50 text-gray-500 group-hover:text-primary group-hover:bg-primary/10'
                                }`}>
                                {cat.icon}
                            </div>
                            <h3 className="font-bold text-sm mb-1">{cat.name}</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{cat.count} Resources</p>
                        </div>
                    ))}
                </motion.div>

                {/* Featured Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Feature - Spans 2 cols */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                                {activeCategory === 'All' ? 'Essential Playbooks' : `${activeCategory} Guides`}
                            </h2>
                            {activeCategory !== 'All' && (
                                <Button variant="ghost" className="text-primary font-black uppercase tracking-widest text-[10px]" onClick={() => setActiveCategory('All')}>View All</Button>
                            )}
                        </div>

                        <div className="grid gap-6 min-h-[400px]">
                            <AnimatePresence mode="popLayout">
                                {filteredGuides.length > 0 ? (
                                    filteredGuides.map((guide, i) => (
                                        <motion.div
                                            key={guide.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                            transition={{ duration: 0.4 }}
                                            onClick={() => handleAction(`Opening "${guide.title}"`)}
                                            className="group relative bg-white dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-white/5 p-8 rounded-[40px] hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden cursor-pointer"
                                        >
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none" />

                                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                                <div className={`shrink-0 w-20 h-20 rounded-[28px] ${guide.color} border flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                                                    {guide.icon}
                                                </div>
                                                <div className="flex-1 w-full">
                                                    <div className="flex items-center gap-3 mb-3 shrink-0">
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{guide.category}</span>
                                                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                                                        <span className="text-[10px] font-bold text-gray-400 flex items-center"><Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" /> {guide.rating}</span>
                                                    </div>
                                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors tracking-tight leading-tight">
                                                        {guide.title}
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-relaxed mb-6">
                                                        {guide.description}
                                                    </p>
                                                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-6">
                                                        <span className="text-xs font-bold text-gray-500 flex items-center gap-2">
                                                            <BookOpen className="h-4 w-4" /> {guide.readTime}
                                                        </span>
                                                        <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                                                            Read Now <ChevronRight className="h-4 w-4 ml-1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center justify-center text-center p-12 bg-white/50 dark:bg-gray-800/40 border border-gray-100 dark:border-white/5 rounded-[40px]"
                                    >
                                        <Search className="h-12 w-12 text-gray-300 mb-4" />
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
                                        <p className="text-gray-500 text-sm">We couldn't find any resources matching your search criteria.</p>
                                        <Button
                                            variant="outline"
                                            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                                            className="mt-6 rounded-xl text-xs font-black uppercase tracking-widest"
                                        >
                                            Clear Filters
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">
                        {/* Masterclass Promo */}
                        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-[40px] p-8 overflow-hidden border border-white/10 group cursor-pointer" onClick={() => handleAction('Reserving Strategy Seat')}>
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700 w-full h-full" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

                            <div className="relative z-10 flex flex-col h-full justify-end min-h-[300px]">
                                <div className="bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl w-max mb-4 flex items-center gap-2">
                                    <PlayCircle className="h-3 w-3" /> Live Masterclass
                                </div>
                                <h3 className="text-3xl font-black text-white mb-3 tracking-tighter leading-none">Cracking the FAANG Interview</h3>
                                <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8">Join David Chen (Ex-Engineering Director, Meta) for an exclusive deep dive.</p>
                                <Button className="w-full bg-white text-black hover:bg-gray-100 rounded-2xl h-14 font-black text-[10px] uppercase tracking-widest transition-transform group-hover:scale-105 active:scale-95 duration-300">
                                    Reserve Strategy Seat
                                </Button>
                            </div>
                        </div>

                        {/* Toolkit Download */}
                        <div className="bg-primary/5 border border-primary/10 rounded-[40px] p-8 cursor-pointer group" onClick={() => handleAction('Downloading Toolkit')}>
                            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center text-primary mb-6 group-hover:rotate-12 transition-transform">
                                <Download className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">The Ultimate Tech Career Toolkit</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-8">15+ templates, checklists, and scripts to fast-track your job search.</p>
                            <Button className="w-full bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-2xl h-14 font-black text-[10px] uppercase tracking-widest">
                                Download Free Pack
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Resources;
