import { MapPin, Clock, DollarSign, Bookmark, Briefcase } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardContent } from '../ui/Card';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';
import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import jobService from '../../features/jobs/jobService';

const JobCard = ({ job }) => {
    const { user, updateUser } = useContext(AuthContext);
    const [isSaving, setIsSaving] = useState(false);

    const isJobSaved = user?.savedJobs?.some(id => id === job._id || id._id === job._id);

    const handleSave = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            alert('Please login to save jobs');
            return;
        }

        setIsSaving(true);
        try {
            const res = await jobService.toggleSaveJob(job._id, user.token);
            if (res.savedJobs) {
                updateUser({ savedJobs: res.savedJobs });
            }
        } catch (error) {
            console.error('Error toggling save job:', error);
            alert(error.response?.data?.message || 'Failed to save job');
        } finally {
            setIsSaving(false);
        }
    };
    return (
        <Card className="hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-800 rounded-[32px] overflow-hidden group">
            <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="h-20 w-20 rounded-3xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-600 overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-500">
                        <img
                            src={job.companyLogo ? `${API_BASE_URL}${job.companyLogo}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=random&color=fff&size=80&bold=true`}
                            alt={`${job.company} logo`}
                            className="h-12 w-12 object-contain"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors tracking-tight">
                                    <Link to={`/jobs/${job._id}`}>{job.title}</Link>
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-wider">{job.company}</p>
                                    {job.featured && (
                                        <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 font-black text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-md">Verified Feature</Badge>
                                    )}
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`rounded-xl transition-all duration-300 ${isJobSaved ? 'bg-secondary/10 text-secondary' : 'text-gray-300 hover:text-secondary hover:bg-secondary/5 dark:text-gray-600'}`}
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                <Bookmark className={`h-6 w-6 ${isJobSaved ? 'fill-current' : ''}`} />
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm font-bold text-gray-400 dark:text-gray-500 mb-8 uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-primary" />
                                <span>{job.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-primary" />
                                <span className="text-gray-900 dark:text-white">{job.salary}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {job.requirements && job.requirements.slice(0, 3).map((req, index) => (
                                <Badge key={index} variant="outline" className="border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-lg">
                                    {req}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className="flex md:flex-col items-center justify-end gap-4 min-w-[160px]">
                        <Link to={`/jobs/${job._id}`} className="w-full">
                            <Button className="w-full h-14 bg-primary hover:bg-blue-800 text-white font-black text-lg rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95">
                                View Details
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default JobCard;
