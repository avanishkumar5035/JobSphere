import React, { useState, useEffect } from 'react';
import { ChevronRight, ExternalLink, Building } from 'lucide-react';
import { Button } from '../ui/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';

const companyLogos = {
    'Google': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    'Microsoft': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    'Amazon': 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    'Meta': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    'Netflix': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    'Apple': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
};

const CompanyCluster = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopCompanies = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/auth/employers`);
                // Take top 6 for the cluster
                setCompanies(response.data.slice(0, 6));
            } catch (error) {
                console.error("Failed to fetch cluster companies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopCompanies();
    }, []);

    if (loading) return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-[32px] border border-white/5" />
            ))}
        </div>
    );

    return (
        <div className="mb-20">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                <div className="max-w-xl">
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
                        Eco<span className="text-primary italic">system</span> Partners
                    </h2>
                    <p className="mt-3 text-gray-500 dark:text-gray-400 text-lg font-medium leading-relaxed">
                        Collaborating with world-class professional organizations to accelerate your career growth.
                    </p>
                </div>
                <Button
                    variant="ghost"
                    className="group text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary/5 px-8 rounded-2xl h-14 border border-primary/10 hover:border-primary/20 transition-all flex items-center"
                    onClick={() => navigate('/companies')}
                >
                    Expand Network
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {companies.map((company) => {
                    const name = company.companyName || company.name;
                    const logo = company.companyLogo;

                    return (
                        <div
                            key={company._id}
                            onClick={() => navigate(`/companies`)}
                            className="group relative bg-white dark:bg-gray-800/40 backdrop-blur-xl p-8 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-2xl shadow-primary/5 hover:shadow-primary/20 transition-all duration-700 hover:-translate-y-4 cursor-pointer flex flex-col items-center text-center overflow-hidden"
                        >
                            {/* Decorative background element */}
                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />

                            <div className="relative w-24 h-24 bg-gray-50 dark:bg-gray-900/50 rounded-3xl flex items-center justify-center mb-6 p-4 border border-transparent dark:border-white/5 transition-all duration-700 group-hover:scale-110 group-hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] group-hover:rotate-3">
                                {logo ? (
                                    <img
                                        src={logo.startsWith('http') ? logo : `${API_BASE_URL}${logo}`}
                                        alt={name}
                                        className="max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all"
                                    />
                                ) : (
                                    <Building className="h-12 w-12 text-primary group-hover:rotate-12 transition-transform" />
                                )}
                            </div>

                            <h3 className="relative font-black text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors text-[11px] uppercase tracking-[0.2em] line-clamp-1 w-full">
                                {name}
                            </h3>

                            <div className="relative flex items-center gap-1.5 text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] group-hover:text-primary/70 transition-colors">
                                <div className="h-1.5 w-1.5 rounded-full bg-secondary shadow-lg shadow-secondary/20" />
                                Verified
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CompanyCluster;
