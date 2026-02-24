import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { MapPin, DollarSign, Clock, Building, ArrowLeft, Share2, Bookmark, X } from 'lucide-react';
import jobService from '../features/jobs/jobService';
import AuthContext from '../context/AuthContext';
import applicationService from '../features/application/applicationService';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, updateUser } = useContext(AuthContext);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [applicationData, setApplicationData] = useState({
        resumeLink: '',
        coverLetter: ''
    });
    const [applying, setApplying] = useState(false);
    const [applySuccess, setApplySuccess] = useState(false);
    const [alreadyApplied, setAlreadyApplied] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [shareSuccess, setShareSuccess] = useState(false);

    const isJobSaved = user?.savedJobs?.some(id => id === id || id._id === id);
    // Wait, the above line has a bug (id === id). Fixed below in the actual logic.
    const isJobSavedLocal = user?.savedJobs?.some(savedId => {
        const sid = typeof savedId === 'string' ? savedId : savedId._id;
        return sid === id;
    });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const data = await jobService.getJob(id);
                setJob(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching job details:", err);
                setError("Job not found or failed to load.");
                setLoading(false);
            }
        };

        if (id) {
            fetchJob();
        }
    }, [id]);

    useEffect(() => {
        // Check if user has already applied
        const checkApplicationStatus = async () => {
            if (user && user.role === 'seeker') {
                try {
                    const myApps = await applicationService.getMyApplications(user.token);
                    const hasApplied = myApps.some(app => app.job._id === id || app.job === id);
                    if (hasApplied) setAlreadyApplied(true);
                } catch (error) {
                    console.error("Error checking application status", error);
                }
            }
        };

        if (user && id) {
            checkApplicationStatus();
        }
    }, [user, id]);

    const handleApplyClick = () => {
        if (!user) {
            // Redirect to login with return path
            navigate('/login', { state: { from: location } });
        } else if (user.role !== 'seeker') {
            alert("Only job seekers can apply.");
        } else {
            setShowApplyModal(true);
        }
    };

    const handleApplySubmit = async (e) => {
        e.preventDefault();
        setApplying(true);
        try {
            await applicationService.applyForJob(id, applicationData, user.token);
            setApplySuccess(true);
            setAlreadyApplied(true);
            setTimeout(() => {
                setShowApplyModal(false);
                setApplySuccess(false);
            }, 2000);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to apply");
        } finally {
            setApplying(false);
        }
    };

    const handleSave = async () => {
        if (!user) {
            alert('Please login to save jobs');
            return;
        }

        setIsSaving(true);
        try {
            const res = await jobService.toggleSaveJob(id, user.token);
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

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setShareSuccess(true);
            setTimeout(() => setShareSuccess(false), 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert('Failed to copy link to clipboard');
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <p className="text-gray-500 dark:text-gray-400">Loading job details...</p>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{error || "Job not found"}</h2>
                <Link to="/jobs">
                    <Button>Back to Jobs</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 relative transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/jobs" className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-accent mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Jobs
                </Link>

                {/* Header Card */}
                <Card className="mb-8 overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700">
                    <div className="bg-primary/5 dark:bg-gray-700 h-24 sm:h-32 w-full"></div>
                    <CardContent className="px-8 pb-8 -mt-12 sm:-mt-16 relative">
                        <div className="flex flex-col sm:flex-row justify-between items-start">
                            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end mb-6 sm:mb-0">
                                <div className="h-24 w-24 rounded-xl bg-white dark:bg-gray-700 shadow-md p-1 flex items-center justify-center text-3xl font-bold text-primary dark:text-white">
                                    {job.company ? job.company.charAt(0) : 'C'}
                                </div>
                                <div className="pb-1">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{job.title}</h1>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                                        <span className="flex items-center gap-1 font-medium">
                                            <Building className="h-4 w-4" />
                                            {job.company}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            {job.location}
                                        </span>
                                        <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-100 dark:border-blue-800">
                                            {new Date(job.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-16 relative">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className={`transition-colors ${isJobSavedLocal ? 'text-accent border-accent' : 'dark:bg-gray-700 dark:text-white dark:border-gray-600'}`}
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    title={isJobSavedLocal ? "Remove from saved" : "Save Job"}
                                >
                                    <Bookmark className={`h-4 w-4 ${isJobSavedLocal ? 'fill-current' : ''}`} />
                                </Button>
                                <div className="relative">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        onClick={handleShare}
                                        title="Share Job"
                                    >
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                    {shareSuccess && (
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
                                            Link Copied!
                                        </div>
                                    )}
                                </div>
                                <Button
                                    className="flex-1 sm:flex-none px-8 dark:bg-primary dark:text-white"
                                    onClick={handleApplyClick}
                                    disabled={alreadyApplied}
                                >
                                    {alreadyApplied ? 'Applied' : 'Apply Now'}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 transition-colors duration-300">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Job Description</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                {job.description}
                            </p>

                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Requirements</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                                {job.requirements && job.requirements.map((req, idx) => (
                                    <li key={idx}>{req}</li>
                                ))}
                            </ul>

                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Benefits</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                                <li>Competitive salary and equity</li>
                                <li>Remote-first culture</li>
                                <li>Health, dental, and vision insurance</li>
                                <li>Flexible vacation policy</li>
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Job Overview</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Salary</p>
                                    <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                                        <DollarSign className="h-4 w-4 text-accent" />
                                        {job.salary}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Job Type</p>
                                    <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                                        <Clock className="h-4 w-4 text-accent" />
                                        {job.type}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Location</p>
                                    <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                                        <MapPin className="h-4 w-4 text-accent" />
                                        {job.location}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-3">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {job.tags && job.tags.map((tag, idx) => (
                                        <Badge key={idx} variant="secondary" className="dark:bg-gray-700 dark:text-gray-200">{tag}</Badge>
                                    ))}
                                    {!job.tags && <span className="text-sm text-gray-400">No tags</span>}
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary rounded-xl shadow-sm p-6 text-white text-center">
                            <h3 className="font-bold text-xl mb-2">Better with the app</h3>
                            <p className="text-blue-100 text-sm mb-4">Get notified about new jobs in real-time.</p>
                            <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-primary">Download App</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Apply Modal */}
            {showApplyModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative transition-colors duration-300">
                        <button
                            onClick={() => setShowApplyModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Apply for {job.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 font-medium bg-gray-50 dark:bg-gray-700 p-2 rounded border border-gray-100 dark:border-gray-600">{job.company}</p>

                        {applySuccess ? (
                            <div className="text-center py-8">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Application Submitted!</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">Good luck! You will be redirected shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleApplySubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resume Link (URL)</label>
                                    <Input
                                        placeholder="https://drive.google.com/..."
                                        required
                                        value={applicationData.resumeLink}
                                        onChange={(e) => setApplicationData({ ...applicationData, resumeLink: e.target.value })}
                                        className="dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Please provide a accessible link to your resume.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cover Letter</label>
                                    <Textarea
                                        placeholder="Why are you a good fit for this role?"
                                        rows={4}
                                        value={applicationData.coverLetter}
                                        onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
                                        className="dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                                    />
                                </div>
                                <div className="pt-2 flex justify-end gap-3">
                                    <Button type="button" variant="outline" onClick={() => setShowApplyModal(false)} className="dark:text-white dark:border-gray-600 dark:hover:bg-gray-700">Cancel</Button>
                                    <Button type="submit" disabled={applying} className="dark:bg-primary dark:text-white">
                                        {applying ? 'Submitting...' : 'Submit Application'}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetails;
