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

    if (loading) return null;

    return (
        <div className="mb-20">
            <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
                <div className="max-w-xl">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Ecosystem Partners</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400 text-lg font-medium">Collaborating with world-class professional organizations.</p>
                </div>
                <Button variant="ghost" className="text-primary font-black uppercase tracking-widest text-xs hover:bg-primary/5 px-6 rounded-xl h-12 border border-transparent hover:border-primary/10" onClick={() => navigate('/companies')}>
                    View All Partners <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {companies.map((company) => {
                    const name = company.companyName || company.name;
                    const logo = companyLogos[name];

                    return (
                        <div
                            key={company._id}
                            onClick={() => navigate(`/companies/${company._id}`)}
                            className="group bg-white dark:bg-gray-800 p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col items-center text-center"
                        >
                            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-3xl flex items-center justify-center mb-6 p-4 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/5">
                                {logo ? (
                                    <img src={logo} alt={name} className="max-w-full max-h-full object-contain filter dark:invert" />
                                ) : (
                                    <Building className="h-10 w-10 text-primary group-hover:rotate-12 transition-transform" />
                                )}
                            </div>
                            <h3 className="font-black text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors text-xs uppercase tracking-widest truncate w-full">{name}</h3>
                            <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.1em]">
                                Verified
                                <div className="h-1 w-1 rounded-full bg-secondary" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CompanyCluster;
