import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Building, MapPin, ExternalLink, Activity, Info } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
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
                            const logo = companyLogos[name];

                            return (
                                <div
                                    key={company._id}
                                    className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl opacity-0 animate-fade-in-up cursor-pointer"
                                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                                    onClick={() => navigate(`/companies/${company._id}`)}
                                >
                                    <Card className="h-full border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 overflow-hidden group rounded-3xl">
                                        <div className="h-32 bg-gradient-to-br from-primary to-indigo-600 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest">
                                                Active
                                            </div>
                                        </div>
                                        <CardContent className="px-8 pb-8 pt-0 relative">
                                            <div className="absolute -top-12 left-8 bg-white dark:bg-gray-700 p-4 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-600 w-24 h-24 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                                                {logo ? (
                                                    <img src={logo} alt={name} className="max-w-full max-h-full object-contain filter dark:invert-0" />
                                                ) : (
                                                    <Building className="h-10 w-10 text-primary" />
                                                )}
                                            </div>
                                            <div className="mt-16">
                                                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                                    {name}
                                                </h3>
                                                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
                                                    <MapPin className="h-4 w-4 mr-1.5 text-primary" />
                                                    {company.companyLocation || 'Remote Friendly'}
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-6 min-h-[40px]">
                                                    {company.companyBio || `Discover the culture and hiring process at ${name}.`}
                                                </p>
                                                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-6">
                                                    <span className="flex items-center text-primary font-bold text-sm">
                                                        Learn More <Info className="h-4 w-4 ml-1.5" />
                                                    </span>
                                                    <div className="flex items-center text-sm font-semibold text-gray-400">
                                                        View Roles
                                                        <ExternalLink className="h-4 w-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                                                    </div>
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
