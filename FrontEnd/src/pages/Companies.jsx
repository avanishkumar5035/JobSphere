import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Building, MapPin, ExternalLink, Activity, Info, ChevronRight, Briefcase } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { API_BASE_URL } from '../config/api';
import { useNavigate } from 'react-router-dom';

const companyLogos = {
    'Google': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    'Microsoft': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    'Amazon': 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    'Meta': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    'Netflix': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    'Apple': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
};

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/auth/employers`);
                setCompanies(response.data);
            } catch (error) {
                console.error("Failed to fetch companies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    return (
        <div className="py-12 relative z-10 w-full min-h-screen bg-gray-50/50 dark:bg-gray-900/50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                        Top Companies <span className="text-primary italic">Hiring Now</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Explore detailed hiring procedures and open roles from global industry leaders.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Activity className="h-10 w-10 text-primary animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {companies.map((company, index) => {
                            const name = company.companyName || company.name;
                            // Priority: Backend Logo field -> Hardcoded mapping -> Default icon
                            let logo = company.companyLogo ? `${API_BASE_URL}${company.companyLogo}` : companyLogos[name];

                            return (
                                <div
                                    key={company?._id}
                                    className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl opacity-0 animate-fade-in-up cursor-pointer"
                                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                                    onClick={() => navigate(`/companies/${company?._id}`)}
                                >
                                    <Card className="h-full border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 overflow-hidden group rounded-3xl">
                                        <div className="relative h-48 overflow-hidden">
                                            {company.companyBanner ? (
                                                <img
                                                    src={company.companyBanner.startsWith('http') ? company.companyBanner : `${API_BASE_URL}${company.companyBanner}`}
                                                    alt="banner"
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-primary via-blue-700 to-indigo-900 group-hover:rotate-3 transition-transform duration-700" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <div className="absolute top-6 right-6">
                                                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full">
                                                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Active</span>
                                                </div>
                                            </div>
                                        </div>
                                        <CardContent className="px-8 pb-8 pt-0 relative">
                                            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 mb-8 relative z-20">
                                                <div className="bg-white dark:bg-gray-800 p-4 rounded-[32px] shadow-2xl shadow-black/20 border border-gray-100 dark:border-white/5 w-28 h-28 flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shrink-0 overflow-hidden backdrop-blur-xl">
                                                    {logo ? (
                                                        <img
                                                            src={logo.startsWith('http') ? logo : `${API_BASE_URL}${logo}`}
                                                            alt={name}
                                                            className="max-w-[80%] max-h-[80%] object-contain filter dark:invert-0"
                                                        />
                                                    ) : (
                                                        <Building className="h-10 w-10 text-primary" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0 pb-2">
                                                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors tracking-tighter leading-none">
                                                        {name}
                                                    </h3>
                                                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-[11px] font-black uppercase tracking-[0.2em]">
                                                        <MapPin className="h-3 w-3 mr-1.5 text-primary shrink-0" />
                                                        <span className="truncate">{company.companyLocation || 'Remote Friendly'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-relaxed line-clamp-2 min-h-[40px]">
                                                    {company.companyBio || `Collaborate with world-class professional organizations and accelerate your career growth at ${name}.`}
                                                </p>

                                                <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                                                    <div className="flex -space-x-3">
                                                        {[...Array(3)].map((_, i) => (
                                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                                                                <div className="text-[8px] font-bold text-gray-500">U{i + 1}</div>
                                                            </div>
                                                        ))}
                                                        <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-primary/10 flex items-center justify-center">
                                                            <span className="text-[8px] font-black text-primary">+12</span>
                                                        </div>
                                                    </div>

                                                    <Button
                                                        variant="ghost"
                                                        className="h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 border border-primary/10"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/companies/${company?._id}`);
                                                        }}
                                                    >
                                                        Review Dossier <ChevronRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                        {companies.length === 0 && (
                            <div className="col-span-full text-center py-20 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700">
                                <Building className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">No companies found yet</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">More employers will be listed here soon.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Adding basic custom animations inline for the fade-in effect to this page */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Companies;
