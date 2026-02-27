import React, { useState, useContext, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { Textarea } from '../components/ui/Textarea';
import {
    User, Mail, Phone, Briefcase, GraduationCap,
    Plus, Edit2, Trash2, FileText, Upload,
    CheckCircle2, AlertCircle, X, ChevronRight, Save, Clock
} from 'lucide-react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CandidateProfile = () => {
    const { user, updateProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Profile State
    const [headline, setHeadline] = useState(user?.headline || '');
    const [skills, setSkills] = useState(user?.skills || []);
    const [experience, setExperience] = useState(user?.experience || []);
    const [education, setEducation] = useState(user?.education || []);
    const [newSkill, setNewSkill] = useState('');

    // Modal & Form States
    const [isExpModalOpen, setIsExpModalOpen] = useState(false);
    const [isEduModalOpen, setIsEduModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [expForm, setExpForm] = useState({ title: '', company: '', startDate: '', endDate: '', current: false, description: '' });
    const [eduForm, setEduForm] = useState({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', current: false });

    // File upload state
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    // Calculate completeness
    const calculateCompleteness = () => {
        let score = 0;
        if (user?.name) score += 20;
        if (user?.headline) score += 20;
        if (user?.resume) score += 20;
        if (user?.skills?.length > 0) score += 15;
        if (user?.experience?.length > 0) score += 15;
        if (user?.education?.length > 0) score += 10;
        return score;
    };

    const completeness = calculateCompleteness();

    const handleSaveBasic = async () => {
        setLoading(true);
        setError(null);
        const res = await updateProfile({ headline });
        if (res.success) {
            setSuccess('Profile updated!');
            setTimeout(() => setSuccess(null), 3000);
        } else {
            setError(res.message);
        }
        setLoading(false);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('resumeFile', file);

        setLoading(true);
        setError(null);
        const res = await updateProfile(formData);
        if (res.success) {
            setSuccess('Resume uploaded!');
            setTimeout(() => setSuccess(null), 3000);
        } else {
            setError(res.message);
        }
        setLoading(false);
    };

    const addSkill = async () => {
        if (!newSkill || skills.includes(newSkill)) return;
        const updatedSkills = [...skills, newSkill];
        setSkills(updatedSkills);
        const res = await updateProfile({ skills: updatedSkills });
        if (res.success) {
            setNewSkill('');
        }
    };

    const removeSkill = async (skillToRemove) => {
        const updatedSkills = skills.filter(s => s !== skillToRemove);
        setSkills(updatedSkills);
        await updateProfile({ skills: updatedSkills });
    };

    const handleExpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let updatedExp;
        if (editingIndex !== null) {
            updatedExp = experience.map((exp, i) => i === editingIndex ? expForm : exp);
        } else {
            updatedExp = [...experience, expForm];
        }
        const res = await updateProfile({ experience: updatedExp });
        if (res.success) {
            setExperience(updatedExp);
            setIsExpModalOpen(false);
            setExpForm({ title: '', company: '', startDate: '', endDate: '', current: false, description: '' });
            setEditingIndex(null);
            setSuccess('Experience saved!');
            setTimeout(() => setSuccess(null), 3000);
        }
        setLoading(false);
    };

    const handleEduSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let updatedEdu;
        if (editingIndex !== null) {
            updatedEdu = education.map((edu, i) => i === editingIndex ? eduForm : edu);
        } else {
            updatedEdu = [...education, eduForm];
        }
        const res = await updateProfile({ education: updatedEdu });
        if (res.success) {
            setEducation(updatedEdu);
            setIsEduModalOpen(false);
            setEduForm({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', current: false });
            setEditingIndex(null);
            setSuccess('Education saved!');
            setTimeout(() => setSuccess(null), 3000);
        }
        setLoading(false);
    };

    const removeExp = async (index) => {
        const updatedExp = experience.filter((_, i) => i !== index);
        const res = await updateProfile({ experience: updatedExp });
        if (res.success) setExperience(updatedExp);
    };

    const removeEdu = async (index) => {
        const updatedEdu = education.filter((_, i) => i !== index);
        const res = await updateProfile({ education: updatedEdu });
        if (res.success) setEducation(updatedEdu);
    };

    const openEditExp = (index) => {
        const exp = experience[index];
        setExpForm({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : '',
            endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : ''
        });
        setEditingIndex(index);
        setIsExpModalOpen(true);
    };

    const openEditEdu = (index) => {
        const edu = education[index];
        setEduForm({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate).toISOString().split('T')[0] : '',
            endDate: edu.endDate ? new Date(edu.endDate).toISOString().split('T')[0] : ''
        });
        setEditingIndex(index);
        setIsEduModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header & Completeness */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="h-32 w-32 rounded-2xl bg-primary/5 flex items-center justify-center border-2 border-primary/10 overflow-hidden shrink-0">
                        {user?.photo ? (
                            <img src={user.photo} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                            <User className="h-16 w-16 text-primary/40" />
                        )}
                    </div>

                    <div className="flex-grow text-center md:text-left space-y-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{user?.name}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-gray-500">
                                <span className="flex items-center gap-1.5 font-medium text-sm sm:text-base"><Mail className="h-4 w-4" /> {user?.email}</span>
                                <span className="flex items-center gap-1.5 font-medium text-sm sm:text-base">
                                    <Phone className="h-4 w-4" />
                                    {user?.phone || 'Add phone'}
                                    {user?.phone && (
                                        user?.mobileVerified ? (
                                            <Badge variant="secondary" className="bg-green-50 text-green-600 border-green-100 text-[10px] py-0 px-2 rounded-full">Verified</Badge>
                                        ) : (
                                            <Link to="/verify-mobile" className="text-[10px] text-primary hover:underline font-bold ml-1">Verify Now</Link>
                                        )
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="max-w-sm mx-auto md:mx-0">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Headline</label>
                            <div className="flex gap-2 mt-1.5">
                                <Input
                                    value={headline}
                                    onChange={(e) => setHeadline(e.target.value)}
                                    placeholder="e.g. Senior Full Stack Developer | React & Node.js"
                                    className="bg-gray-50/50 focus:bg-white transition-all shadow-none border-gray-200"
                                />
                                <Button size="sm" onClick={handleSaveBasic} disabled={loading} className="shrink-0 bg-primary hover:bg-primary/90">
                                    {loading ? <Clock className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0 w-full md:w-48 space-y-3 bg-gray-50 rounded-2xl p-5 border border-gray-100 shadow-inner">
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-bold text-gray-600">Completeness</span>
                            <span className="text-2xl font-black text-primary transition-all">{completeness}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-primary h-3 rounded-full transition-all duration-1000 ease-out shadow-sm" style={{ width: `${completeness}%` }}></div>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold leading-tight uppercase tracking-wider">Boost views by 3x</p>
                    </div>
                </div>

                {success && (
                    <div className="flex items-center gap-2 bg-green-50 text-green-700 font-bold px-4 py-3 rounded-xl border-2 border-green-100 animate-in fade-in slide-in-from-top-2">
                        <CheckCircle2 className="h-5 w-5" /> {success}
                    </div>
                )}
                {error && (
                    <div className="flex items-center gap-2 bg-red-50 text-red-700 font-bold px-4 py-3 rounded-xl border-2 border-red-100 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="h-5 w-5" /> {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Skills & Resume */}
                    <div className="space-y-8">
                        {/* Resume Card */}
                        <Card className="border-none shadow-sm overflow-hidden rounded-2xl">
                            <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
                                <CardTitle className="text-lg flex items-center gap-2 text-gray-800 font-bold">
                                    <FileText className="h-5 w-5 text-primary" /> Resume
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                {user?.resume ? (
                                    <div className="p-4 bg-blue-50/50 rounded-xl border-2 border-blue-100 flex items-center justify-between group hover:border-blue-300 transition-all cursor-pointer">
                                        <div className="flex items-center gap-4 overflow-hidden">
                                            <div className="bg-white p-2.5 rounded-lg border border-blue-200 shadow-sm transition-transform group-hover:scale-110">
                                                <FileText className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div className="truncate text-sm font-bold text-gray-700">Resume_Latest.pdf</div>
                                        </div>
                                        <a href={user.resume} target="_blank" rel="noreferrer" className="text-primary hover:text-primary/80 transition-transform active:scale-95">
                                            <ChevronRight className="h-6 w-6" />
                                        </a>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/30">
                                        <Upload className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                                        <p className="text-xs text-gray-400 font-bold tracking-tight uppercase">No resume uploaded</p>
                                    </div>
                                )}
                                <label className="block">
                                    <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx" />
                                    <Button variant="outline" className="w-full gap-2 text-sm font-bold h-11 border-2 hover:bg-gray-50 rounded-xl transition-all" asChild>
                                        <span><Upload className="h-4 w-4" /> {user?.resume ? 'Update Resume' : 'Add Resume'}</span>
                                    </Button>
                                </label>
                            </CardContent>
                        </Card>

                        {/* Skills Card */}
                        <Card className="border-none shadow-sm overflow-hidden rounded-2xl">
                            <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
                                <CardTitle className="text-lg flex items-center gap-2 text-gray-800 font-bold">
                                    <CheckCircle2 className="h-5 w-5 text-primary" /> Skills
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Add skill (e.g. React)"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                                        className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white rounded-xl shadow-none"
                                    />
                                    <Button size="sm" onClick={addSkill} className="h-11 px-4 rounded-xl shadow-md active:translate-y-0.5 transition-all"><Plus className="h-5 w-5" /></Button>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {skills.map((skill, i) => (
                                        <Badge key={i} variant="secondary" className="pl-4 pr-2 py-2 flex items-center gap-2 font-bold bg-white border-2 border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all group rounded-lg">
                                            {skill}
                                            <button onClick={() => removeSkill(skill)} className="p-0.5 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition-colors">
                                                <X className="h-4 w-4" />
                                            </button>
                                        </Badge>
                                    ))}
                                    {skills.length === 0 && <p className="text-sm text-gray-400 font-medium italic">Start adding skills to stand out.</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Experience & Education */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Experience */}
                        <Card className="border-none shadow-sm overflow-hidden rounded-2xl">
                            <CardHeader className="bg-gray-50/50 border-b border-gray-100 flex flex-row items-center justify-between py-5 px-8">
                                <CardTitle className="text-xl flex items-center gap-2 text-gray-800 font-bold">
                                    <Briefcase className="h-6 w-6 text-primary" /> Work Experience
                                </CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-10 w-10 p-0 rounded-full hover:bg-primary/10 hover:text-primary transition-all active:scale-95"
                                    onClick={() => {
                                        setEditingIndex(null);
                                        setExpForm({ title: '', company: '', startDate: '', endDate: '', current: false, description: '' });
                                        setIsExpModalOpen(true);
                                    }}
                                >
                                    <Plus className="h-6 w-6" />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                {experience.length > 0 ? experience.map((exp, i) => (
                                    <div key={i} className="flex gap-6 group relative">
                                        <div className="h-14 w-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border-2 border-gray-100 mb-auto shadow-sm">
                                            <Briefcase className="h-7 w-7 text-gray-400" />
                                        </div>
                                        <div className="flex-grow space-y-3 pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-extrabold text-gray-900 text-xl tracking-tight">{exp.title}</h4>
                                                    <p className="text-lg text-gray-700 font-bold mt-0.5">{exp.company}</p>
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 transition-all flex gap-1.5 translate-x-3 group-hover:translate-x-0">
                                                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-gray-100 rounded-lg text-gray-600" onClick={() => openEditExp(i)}>
                                                        <Edit2 className="h-4.5 w-4.5" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-red-400 hover:bg-red-50 rounded-lg" onClick={() => removeExp(i)}>
                                                        <Trash2 className="h-4.5 w-4.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} - {exp.current ? <span className="text-accent">Present</span> : new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</p>
                                            <p className="text-base text-gray-600 mt-4 leading-relaxed font-medium">{exp.description}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-12 bg-gray-50/30 rounded-3xl border-2 border-dashed border-gray-100">
                                        <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500 font-bold text-lg">Work history is currently empty</p>
                                        <Button variant="outline" size="sm" className="mt-5 font-bold rounded-xl border-2 px-8 h-11" onClick={() => setIsExpModalOpen(true)}>Add Experience</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Education */}
                        <Card className="border-none shadow-sm overflow-hidden rounded-2xl">
                            <CardHeader className="bg-gray-50/50 border-b border-gray-100 flex flex-row items-center justify-between py-5 px-8">
                                <CardTitle className="text-xl flex items-center gap-2 text-gray-800 font-bold">
                                    <GraduationCap className="h-6 w-6 text-primary" /> Education
                                </CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-10 w-10 p-0 rounded-full hover:bg-primary/10 hover:text-primary transition-all active:scale-95"
                                    onClick={() => {
                                        setEditingIndex(null);
                                        setEduForm({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', current: false });
                                        setIsEduModalOpen(true);
                                    }}
                                >
                                    <Plus className="h-6 w-6" />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                {education.length > 0 ? education.map((edu, i) => (
                                    <div key={i} className="flex gap-6 group relative">
                                        <div className="h-14 w-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border-2 border-gray-100 mb-auto shadow-sm">
                                            <GraduationCap className="h-7 w-7 text-gray-400" />
                                        </div>
                                        <div className="flex-grow space-y-3 pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-extrabold text-gray-900 text-xl tracking-tight">{edu.degree} in {edu.fieldOfStudy}</h4>
                                                    <p className="text-lg text-gray-700 font-bold mt-0.5">{edu.institution}</p>
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 transition-all flex gap-1.5 translate-x-3 group-hover:translate-x-0">
                                                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-gray-100 rounded-lg text-gray-600" onClick={() => openEditEdu(i)}>
                                                        <Edit2 className="h-4.5 w-4.5" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-red-400 hover:bg-red-50 rounded-lg" onClick={() => removeEdu(i)}>
                                                        <Trash2 className="h-4.5 w-4.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{new Date(edu.startDate).getFullYear()} - {edu.current ? <span className="text-accent">Present</span> : new Date(edu.endDate).getFullYear()}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-12 bg-gray-50/30 rounded-3xl border-2 border-dashed border-gray-100">
                                        <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500 font-bold text-lg">Academic background is empty</p>
                                        <Button variant="outline" size="sm" className="mt-5 font-bold rounded-xl border-2 px-8 h-11" onClick={() => setIsEduModalOpen(true)}>Add Education</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Experience Modal */}
            <Modal
                isOpen={isExpModalOpen}
                onClose={() => setIsExpModalOpen(false)}
                title={editingIndex !== null ? 'Edit Experience' : 'Add Experience'}
            >
                <form onSubmit={handleExpSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Job Title</label>
                        <Input required placeholder="e.g. Senior Software Engineer" value={expForm.title} onChange={(e) => setExpForm({ ...expForm, title: e.target.value })} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Company</label>
                        <Input required placeholder="e.g. Google" value={expForm.company} onChange={(e) => setExpForm({ ...expForm, company: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Start Date</label>
                            <Input required type="date" value={expForm.startDate} onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">End Date</label>
                            <Input type="date" disabled={expForm.current} value={expForm.endDate} onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="currentExp" checked={expForm.current} onChange={(e) => setExpForm({ ...expForm, current: e.target.checked })} className="h-4 w-4 rounded border-gray-300" />
                        <label htmlFor="currentExp" className="text-sm font-bold text-gray-600">I am currently working here</label>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
                        <Textarea placeholder="Describe your responsibilities and achievements..." rows={4} value={expForm.description} onChange={(e) => setExpForm({ ...expForm, description: e.target.value })} />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl shadow-lg mt-2 font-bold tracking-tight">
                        {loading ? <Clock className="h-5 w-5 animate-spin mx-auto" /> : 'Save Experience'}
                    </Button>
                </form>
            </Modal>

            {/* Education Modal */}
            <Modal
                isOpen={isEduModalOpen}
                onClose={() => setIsEduModalOpen(false)}
                title={editingIndex !== null ? 'Edit Education' : 'Add Education'}
            >
                <form onSubmit={handleEduSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Degree / Certification</label>
                        <Input required placeholder="e.g. Bachelor of Technology" value={eduForm.degree} onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Field of Study</label>
                        <Input required placeholder="e.g. Computer Science" value={eduForm.fieldOfStudy} onChange={(e) => setEduForm({ ...eduForm, fieldOfStudy: e.target.value })} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Institution</label>
                        <Input required placeholder="e.g. Stanford University" value={eduForm.institution} onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Start Year</label>
                            <Input required type="date" value={eduForm.startDate} onChange={(e) => setEduForm({ ...eduForm, startDate: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">End Year (Expected)</label>
                            <Input type="date" disabled={eduForm.current} value={eduForm.endDate} onChange={(e) => setEduForm({ ...eduForm, endDate: e.target.value })} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="currentEdu" checked={eduForm.current} onChange={(e) => setEduForm({ ...eduForm, current: e.target.checked })} className="h-4 w-4 rounded border-gray-300" />
                        <label htmlFor="currentEdu" className="text-sm font-bold text-gray-600">I am currently studying here</label>
                    </div>
                    <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl shadow-lg mt-2 font-bold tracking-tight">
                        {loading ? <Clock className="h-5 w-5 animate-spin mx-auto" /> : 'Save Education'}
                    </Button>
                </form>
            </Modal>
        </div>
    );
};

export default CandidateProfile;
