import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Users, Mail, FileText, CheckCircle2, XCircle, Clock,
    ArrowLeft, ExternalLink, Download, UserCheck, AlertCircle
} from 'lucide-react';
import applicationService from '../../features/applications/applicationService';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

const statusConfig = {
    applied: { color: 'text-blue-600 bg-blue-50 border-blue-100', icon: Clock, label: 'Applied' },
    reviewing: { color: 'text-amber-600 bg-amber-50 border-amber-100', icon: AlertCircle, label: 'Reviewing' },
    shortlisted: { color: 'text-green-600 bg-green-50 border-green-100', icon: UserCheck, label: 'Shortlisted' },
    rejected: { color: 'text-red-600 bg-red-50 border-red-100', icon: XCircle, label: 'Rejected' },
    hired: { color: 'text-purple-600 bg-purple-50 border-purple-100', icon: CheckCircle2, label: 'Hired' }
};

const ManageJobApplicants = () => {
    const { jobId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const data = await applicationService.getJobApplicants(jobId);
                setApplicants(data);
            } catch (error) {
                console.error("Failed to fetch applicants", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApplicants();
    }, [jobId]);

    const handleStatusUpdate = async (applicationId, newStatus) => {
        setUpdatingId(applicationId);
        try {
            await applicationService.updateApplicationStatus(applicationId, newStatus);
            setApplicants(applicants.map(app =>
                app._id === applicationId ? { ...app, status: newStatus } : app
            ));
        } catch (error) {
            console.error("Failed to update status", error);
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/dashboard/employer" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 group transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </Link>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                            <Users className="h-8 w-8 text-primary" />
                            Manage Applicants
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Reviewing {applicants.length} candidates who applied for this role.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {applicants.length > 0 ? (
                        applicants.map((app) => (
                            <Card key={app._id} className="overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-0">
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Status Sidebar */}
                                        <div className={`w-full lg:w-2 ${statusConfig[app.status]?.color.split(' ')[1]} opacity-60`} />

                                        <div className="flex-grow p-8">
                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                                <div className="flex items-start gap-5">
                                                    <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold text-xl">
                                                        {app.applicant?.name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                            {app.applicant?.name}
                                                        </h3>
                                                        <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2 mb-4">
                                                            <Mail className="h-4 w-4" />
                                                            {app.applicant?.email}
                                                        </p>

                                                        {/* Status Badge */}
                                                        {(() => {
                                                            const cfg = statusConfig[app.status];
                                                            const Icon = cfg.icon;
                                                            return (
                                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${cfg.color}`}>
                                                                    <Icon className="h-3.5 w-3.5" />
                                                                    {cfg.label}
                                                                </span>
                                                            );
                                                        })()}
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-3">
                                                    <a href={app.resumeLink} target="_blank" rel="noopener noreferrer">
                                                        <Button variant="outline" size="sm" className="rounded-xl border-gray-200 dark:border-gray-700">
                                                            <Download className="h-4 w-4 mr-2" /> Resume
                                                        </Button>
                                                    </a>
                                                    <Button variant="outline" size="sm" className="rounded-xl border-gray-200">
                                                        <FileText className="h-4 w-4 mr-2" /> Profile
                                                    </Button>
                                                </div>
                                            </div>

                                            {app.coverLetter && (
                                                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{app.coverLetter}"</p>
                                                </div>
                                            )}

                                            {/* Action Section */}
                                            <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">Update Status:</span>
                                                <Button
                                                    size="sm"
                                                    disabled={updatingId === app._id || app.status === 'shortlisted'}
                                                    onClick={() => handleStatusUpdate(app._id, 'shortlisted')}
                                                    className="rounded-xl bg-green-600 hover:bg-green-700"
                                                >
                                                    Shortlist
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    disabled={updatingId === app._id || app.status === 'reviewing'}
                                                    onClick={() => handleStatusUpdate(app._id, 'reviewing')}
                                                    className="rounded-xl"
                                                >
                                                    In Review
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    disabled={updatingId === app._id || app.status === 'rejected'}
                                                    onClick={() => handleStatusUpdate(app._id, 'rejected')}
                                                    className="rounded-xl text-red-600 hover:bg-red-50"
                                                >
                                                    Reject
                                                </Button>
                                                {app.status === 'shortlisted' && (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleStatusUpdate(app._id, 'hired')}
                                                        className="rounded-xl bg-purple-600 hover:bg-purple-700"
                                                    >
                                                        Hire Candidate
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-16 text-center border-2 border-dashed border-gray-100 dark:border-gray-800">
                            <Users className="h-16 w-16 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No applicants yet</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">When candidates apply for this job, they will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageJobApplicants;
