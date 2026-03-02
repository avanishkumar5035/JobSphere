import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Building, MapPin, Globe, ArrowLeft, CheckCircle2, Briefcase, Users, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { API_BASE_URL } from '../config/api';
import JobCard from '../components/shared/JobCard';

const CompanyDetails = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showCultureModal, setShowCultureModal] = useState(false);

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing);
        // In a real app, you would make an API call here to save the follow state
    };

    useEffect(() => {
        const fetchCompanyAndJobs = async () => {
            try {
                const [companyRes, jobsRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/auth/companies/${id}`),
                    axios.get(`${API_BASE_URL}/api/jobs?keyword=${company?.companyName || ''}`) // Rough way to find company jobs
                ]);
                setCompany(companyRes.data);
                // Filter jobs specifically for this company name if keyword search is too broad
                setJobs(jobsRes.data.filter(j => j.company === companyRes.data.companyName || j.company === companyRes.data.name));
            } catch (error) {
                console.error("Failed to fetch company details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyAndJobs();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!company) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Company not found</h2>
                <Link to="/companies">
                    <Button>Back to Companies</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <Link to="/jobs" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors group">
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Jobs
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 mb-8">
                    <div className="h-48 bg-gradient-to-r from-primary/80 to-indigo-600 relative">
                        <div className="absolute -bottom-12 left-8 p-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="w-24 h-24 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                                <Building className="h-12 w-12 text-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 pb-10 px-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{company.companyName || company.name}</h1>
                                <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                                    <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        {company.companyLocation || 'Global'}
                                    </span>
                                    <a
                                        href={company.companyWebsite}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-primary hover:underline font-medium text-sm"
                                    >
                                        <Globe className="h-4 w-4" />
                                        {company.companyWebsite?.replace('https://', '').replace('www.', '') || 'website.com'}
                                    </a>
                                </div>
                            </div>
                            <div className="flex gap-3 relative">
                                <Button
                                    size="lg"
                                    onClick={handleFollowToggle}
                                    className={`rounded-xl px-8 shadow-lg transition-all duration-300 ${isFollowing ? 'bg-gray-100 text-gray-800 hover:bg-red-50 dark:bg-gray-700 dark:text-white dark:hover:bg-red-900/20' : 'shadow-primary/20'}`}
                                    variant={isFollowing ? 'outline' : 'default'}
                                >
                                    {isFollowing ? 'Following' : 'Follow Company'}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => setShowCultureModal(true)}
                                    className="rounded-xl px-8 dark:border-gray-600 dark:text-gray-300"
                                >
                                    View Culture
                                </Button>

                                {/* Simple Action/Culture Popup */}
                                {showCultureModal && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowCultureModal(false)}>
                                        <div
                                            className="bg-white dark:bg-gray-800 rounded-[32px] p-8 max-w-lg w-full shadow-2xl border border-gray-100 dark:border-gray-700"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Life at {company.companyName || company.name}</h3>
                                                <button onClick={() => setShowCultureModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">✕</button>
                                            </div>
                                            <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                                <p><strong>Core Values:</strong> Innovation, Integrity, and Inclusivity.</p>
                                                <p><strong>Perks:</strong> Flexible working hours, comprehensive health insurance, continuous learning allowances, and regular team offsites.</p>
                                                <p><strong>Work Environment:</strong> We believe in a highly collaborative and autonomous environment where every engineer has a voice in product decisions.</p>
                                            </div>
                                            <Button className="w-full mt-8 rounded-xl" onClick={() => setShowCultureModal(false)}>Close</Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Bio Section */}
                        <section className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 animate-fade-in">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About the Company</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                {company.companyBio || "No bio available for this company yet. Stay tuned for more updates on their mission and values."}
                            </p>
                        </section>

                        {/* Hiring Process Section */}
                        <section className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <Users className="h-6 w-6 text-primary" />
                                Hiring Procedure
                            </h2>
                            <div className="relative border-l-2 border-gray-100 dark:border-gray-700 ml-4 pl-8 space-y-8">
                                {company.hiringSteps && company.hiringSteps.length > 0 ? (
                                    company.hiringSteps.map((step, index) => (
                                        <div key={index} className="relative">
                                            <div className="absolute -left-[41px] top-0 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md">
                                                {step.step || index + 1}
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-500 dark:text-gray-400">
                                        The company hasn't detailed their hiring process yet. Typically involves an initial screening followed by technical and cultural rounds.
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Open Jobs Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <Briefcase className="h-6 w-6 text-primary" />
                                Open Opportunities
                            </h2>
                            <div className="space-y-4">
                                {jobs.length > 0 ? (
                                    jobs.map(job => (
                                        <JobCard key={job._id} job={job} />
                                    ))
                                ) : (
                                    <div className="bg-white dark:bg-gray-800 p-12 text-center rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
                                        <p className="text-gray-500 dark:text-gray-400">No active job openings at the moment. Check back soon!</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Company Overview</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">Founded</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">2005</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">Employees</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">1000+</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">Hiring Status</span>
                                    <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Active</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-900 to-primary/20 p-8 rounded-3xl text-white shadow-xl">
                            <Star className="h-10 w-10 text-yellow-400 mb-4 fill-yellow-400" />
                            <div className="mt-8 flex items-center gap-4 py-4 border-y border-gray-100 dark:border-gray-800">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold">4.8</div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">Highly Recommended</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Based on 500+ employee reviews on JobSphere.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetails;
