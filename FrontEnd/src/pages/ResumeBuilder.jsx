import React, { useState, useRef } from 'react';
import { Button } from '../components/ui/Button';
import { Download, Plus, Trash2, LayoutTemplate, BriefcaseBusiness, GraduationCap, User, Wrench, ChevronRight, Check } from 'lucide-react';
import ModernTemplate from '../components/resume/ModernTemplate';
import ProfessionalTemplate from '../components/resume/ProfessionalTemplate';
import CreativeTemplate from '../components/resume/CreativeTemplate';
import MinimalistTemplate from '../components/resume/MinimalistTemplate';

const initialData = {
    personalInfo: {
        name: 'Jane Doe',
        title: 'Senior Frontend Developer',
        email: 'jane.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'janedoe',
        github: 'janedoe-dev'
    },
    summary: 'Passionate and detail-oriented Frontend Developer with over 5 years of experience building responsive, user-centric web applications. Proficient in React, TypeScript, and modern CSS frameworks. Adept at collaborating with cross-functional teams to deliver high-quality software solutions.',
    experience: [
        {
            company: 'Tech Innovations Inc.',
            role: 'Senior Frontend Developer',
            duration: 'Jan 2021 - Present',
            description: '• Lead the frontend development of a high-traffic e-commerce platform using React and Next.js.\n• Mentored a team of 3 junior developers and established coding standards.\n• Improved site performance scores by 40% through lazy loading and code splitting.'
        },
        {
            company: 'Creative Web Solutions',
            role: 'Web Developer',
            duration: 'Jun 2018 - Dec 2020',
            description: '• Developed custom WordPress themes and plugins for diverse clients.\n• Collaborated closely with designers to ensure pixel-perfect implementations.\n• Integrated multiple third-party APIs for payment processing and analytics.'
        }
    ],
    education: [
        {
            school: 'University of California, Berkeley',
            degree: 'Bachelor of Science in Computer Science',
            year: '2014 - 2018'
        }
    ],
    skills: ['JavaScript (ES6+)', 'React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Git / GitHub', 'Jest / React Testing Library']
};

const ResumeBuilder = () => {
    const [resumeData, setResumeData] = useState(initialData);
    const [selectedTemplate, setSelectedTemplate] = useState('modern');
    const [activeTab, setActiveTab] = useState('personal');
    const previewRef = useRef(null);

    const handlePrint = () => {
        window.print();
    };

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setResumeData({
            ...resumeData,
            personalInfo: { ...resumeData.personalInfo, [name]: value }
        });
    };

    const handleSummaryChange = (e) => {
        setResumeData({ ...resumeData, summary: e.target.value });
    };

    // Generic Handlers for arrays
    const handleArrayItemChange = (field, index, key, value) => {
        const newArray = [...resumeData[field]];
        newArray[index] = { ...newArray[index], [key]: value };
        setResumeData({ ...resumeData, [field]: newArray });
    };

    const addArrayItem = (field, emptyItem) => {
        setResumeData({ ...resumeData, [field]: [...resumeData[field], emptyItem] });
    };

    const removeArrayItem = (field, index) => {
        const newArray = [...resumeData[field]];
        newArray.splice(index, 1);
        setResumeData({ ...resumeData, [field]: newArray });
    };

    const handleSkillChange = (index, value) => {
        const newSkills = [...resumeData.skills];
        newSkills[index] = value;
        setResumeData({ ...resumeData, skills: newSkills });
    };

    const addSkill = () => {
        setResumeData({ ...resumeData, skills: [...resumeData.skills, ''] });
    };

    const removeSkill = (index) => {
        const newSkills = [...resumeData.skills];
        newSkills.splice(index, 1);
        setResumeData({ ...resumeData, skills: newSkills });
    };

    const renderTemplate = () => {
        switch (selectedTemplate) {
            case 'professional':
                return <ProfessionalTemplate data={resumeData} />;
            case 'creative':
                return <CreativeTemplate data={resumeData} />;
            case 'minimalist':
                return <MinimalistTemplate data={resumeData} />;
            case 'modern':
            default:
                return <ModernTemplate data={resumeData} />;
        }
    };

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: <User size={16} /> },
        { id: 'experience', label: 'Experience', icon: <BriefcaseBusiness size={16} /> },
        { id: 'education', label: 'Education', icon: <GraduationCap size={16} /> },
        { id: 'skills', label: 'Skills', icon: <Wrench size={16} /> },
        { id: 'templates', label: 'Templates', icon: <LayoutTemplate size={16} /> }
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pt-4 pb-12 print:bg-white print:p-0">
            {/* Navigation & Controls - Hidden on Print */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 print:hidden">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                            Resume <span className="text-primary">Builder</span>
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mt-1">Live Preview & Export</p>
                    </div>
                    <Button onClick={handlePrint} className="bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-widest text-xs px-6 py-3 rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2">
                        <Download size={16} /> Export PDF
                    </Button>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left Column: Form Controls - Hidden on Print */}
                    <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col gap-6 print:hidden">
                        
                        {/* Tab Navigation */}
                        <div className="bg-white dark:bg-gray-900 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex overflow-x-auto hide-scrollbar">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 flex-shrink-0 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                                        activeTab === tab.id 
                                        ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-100' 
                                        : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-400'
                                    }`}
                                >
                                    {tab.icon} {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Form Content */}
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex-grow">
                            
                            {/* Personal Info Tab */}
                            {activeTab === 'personal' && (
                                <div className="space-y-5 animate-fade-in">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">Full Name</label>
                                            <input type="text" name="name" value={resumeData.personalInfo.name} onChange={handlePersonalInfoChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">Professional Title</label>
                                            <input type="text" name="title" value={resumeData.personalInfo.title} onChange={handlePersonalInfoChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">Email</label>
                                            <input type="email" name="email" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">Phone</label>
                                            <input type="text" name="phone" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">Location</label>
                                            <input type="text" name="location" value={resumeData.personalInfo.location} onChange={handlePersonalInfoChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">LinkedIn username/url</label>
                                            <input type="text" name="linkedin" value={resumeData.personalInfo.linkedin} onChange={handlePersonalInfoChange} placeholder="e.g. janedoe" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">GitHub username/url</label>
                                            <input type="text" name="github" value={resumeData.personalInfo.github} onChange={handlePersonalInfoChange} placeholder="e.g. janedoe-dev" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">Professional Summary</label>
                                        <textarea rows={4} value={resumeData.summary} onChange={handleSummaryChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm leading-relaxed" />
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <Button onClick={() => setActiveTab('experience')} className="px-6 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-1">Next: Experience <ChevronRight size={16} /></Button>
                                    </div>
                                </div>
                            )}

                            {/* Experience Tab */}
                            {activeTab === 'experience' && (
                                <div className="space-y-6 animate-fade-in">
                                    {resumeData.experience.map((exp, index) => (
                                        <div key={index} className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 relative group">
                                            <button onClick={() => removeArrayItem('experience', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Trash2 size={16} />
                                            </button>
                                            <div className="space-y-4 pr-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Company</label>
                                                        <input type="text" value={exp.company} onChange={(e) => handleArrayItemChange('experience', index, 'company', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Role</label>
                                                        <input type="text" value={exp.role} onChange={(e) => handleArrayItemChange('experience', index, 'role', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Duration (e.g. Jan 2021 - Present)</label>
                                                        <input type="text" value={exp.duration} onChange={(e) => handleArrayItemChange('experience', index, 'duration', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Description</label>
                                                    <textarea rows={4} value={exp.description} onChange={(e) => handleArrayItemChange('experience', index, 'description', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button variant="outline" onClick={() => addArrayItem('experience', { company: '', role: '', duration: '', description: '' })} className="w-full border-dashed border-2 py-4 rounded-2xl flex items-center justify-center gap-2 text-gray-500 hover:text-primary hover:border-primary transition-colors">
                                        <Plus size={16} /> Add Experience
                                    </Button>
                                    <div className="flex justify-between pt-4">
                                        <Button variant="ghost" onClick={() => setActiveTab('personal')} className="text-xs font-bold uppercase tracking-widest">Back</Button>
                                        <Button onClick={() => setActiveTab('education')} className="px-6 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-1">Next: Education <ChevronRight size={16} /></Button>
                                    </div>
                                </div>
                            )}

                            {/* Education Tab */}
                            {activeTab === 'education' && (
                                <div className="space-y-6 animate-fade-in">
                                    {resumeData.education.map((edu, index) => (
                                        <div key={index} className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 relative group">
                                            <button onClick={() => removeArrayItem('education', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Trash2 size={16} />
                                            </button>
                                            <div className="space-y-4 pr-6">
                                                <div className="grid grid-cols-1 gap-4">
                                                    <div>
                                                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">School / University</label>
                                                        <input type="text" value={edu.school} onChange={(e) => handleArrayItemChange('education', index, 'school', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Degree</label>
                                                        <input type="text" value={edu.degree} onChange={(e) => handleArrayItemChange('education', index, 'degree', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Year</label>
                                                        <input type="text" value={edu.year} onChange={(e) => handleArrayItemChange('education', index, 'year', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button variant="outline" onClick={() => addArrayItem('education', { school: '', degree: '', year: '' })} className="w-full border-dashed border-2 py-4 rounded-2xl flex items-center justify-center gap-2 text-gray-500 hover:text-primary hover:border-primary transition-colors">
                                        <Plus size={16} /> Add Education
                                    </Button>
                                    <div className="flex justify-between pt-4">
                                        <Button variant="ghost" onClick={() => setActiveTab('experience')} className="text-xs font-bold uppercase tracking-widest">Back</Button>
                                        <Button onClick={() => setActiveTab('skills')} className="px-6 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-1">Next: Skills <ChevronRight size={16} /></Button>
                                    </div>
                                </div>
                            )}

                            {/* Skills Tab */}
                            {activeTab === 'skills' && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {resumeData.skills.map((skill, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={skill}
                                                    onChange={(e) => handleSkillChange(index, e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:border-primary"
                                                    placeholder="e.g. React.js"
                                                />
                                                <button onClick={() => removeSkill(index)} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant="outline" onClick={addSkill} className="w-full border-dashed border-2 py-3 rounded-xl flex items-center justify-center gap-2 text-gray-500 hover:text-primary hover:border-primary transition-colors">
                                        <Plus size={16} /> Add Skill
                                    </Button>
                                    <div className="flex justify-between pt-4">
                                        <Button variant="ghost" onClick={() => setActiveTab('education')} className="text-xs font-bold uppercase tracking-widest">Back</Button>
                                        <Button onClick={() => setActiveTab('templates')} className="px-6 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-1">Choose Template <ChevronRight size={16} /></Button>
                                    </div>
                                </div>
                            )}

                            {/* Templates Tab */}
                            {activeTab === 'templates' && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        
                                        {/* Template 1 */}
                                        <div 
                                            onClick={() => setSelectedTemplate('modern')} 
                                            className={`cursor-pointer rounded-2xl border-2 overflow-hidden transition-all duration-300 ${selectedTemplate === 'modern' ? 'border-primary ring-4 ring-primary/20 shadow-xl scale-[1.02]' : 'border-gray-200 dark:border-gray-800 hover:border-primary/50'}`}
                                        >
                                            <div className="h-40 bg-gray-100 flex p-3">
                                                <div className="w-1/3 bg-primary rounded-l-sm"></div>
                                                <div className="w-2/3 bg-white rounded-r-sm p-3 space-y-2">
                                                    <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                                                    <div className="h-2 w-full bg-gray-100 rounded mt-4"></div>
                                                    <div className="h-2 w-full bg-gray-100 rounded"></div>
                                                    <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-white dark:bg-gray-900 flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-black text-gray-900 dark:text-white">Modern</h3>
                                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Clean & Bold</p>
                                                </div>
                                                {selectedTemplate === 'modern' && <div className="bg-primary text-white p-1 rounded-full"><Check size={16} /></div>}
                                            </div>
                                        </div>

                                        {/* Template 2 */}
                                        <div 
                                            onClick={() => setSelectedTemplate('professional')} 
                                            className={`cursor-pointer rounded-2xl border-2 overflow-hidden transition-all duration-300 ${selectedTemplate === 'professional' ? 'border-primary ring-4 ring-primary/20 shadow-xl scale-[1.02]' : 'border-gray-200 dark:border-gray-800 hover:border-primary/50'}`}
                                        >
                                            <div className="h-40 bg-gray-100 flex flex-col p-4 items-center gap-2">
                                                <div className="h-3 w-1/3 bg-gray-400 rounded"></div>
                                                <div className="flex gap-2 w-1/2 justify-center pb-2 border-b border-gray-300">
                                                    <div className="h-1.5 w-4 bg-gray-300 rounded"></div>
                                                    <div className="h-1.5 w-4 bg-gray-300 rounded"></div>
                                                    <div className="h-1.5 w-4 bg-gray-300 rounded"></div>
                                                </div>
                                                <div className="h-2 w-full bg-gray-200 rounded mt-2"></div>
                                                <div className="h-2 w-full bg-gray-200 rounded"></div>
                                            </div>
                                            <div className="p-4 bg-white dark:bg-gray-900 flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-black text-gray-900 dark:text-white">Professional</h3>
                                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">ATS Optimized</p>
                                                </div>
                                                {selectedTemplate === 'professional' && <div className="bg-primary text-white p-1 rounded-full"><Check size={16} /></div>}
                                            </div>
                                        </div>

                                        {/* Template 3: Creative */}
                                        <div 
                                            onClick={() => setSelectedTemplate('creative')} 
                                            className={`cursor-pointer rounded-2xl border-2 overflow-hidden transition-all duration-300 ${selectedTemplate === 'creative' ? 'border-primary ring-4 ring-primary/20 shadow-xl scale-[1.02]' : 'border-gray-200 dark:border-gray-800 hover:border-primary/50'}`}
                                        >
                                            <div className="h-40 bg-gray-100 flex p-3 relative">
                                                <div className="absolute top-0 right-0 w-8 h-8 bg-primary/20 object-cover rounded-bl-full"></div>
                                                <div className="w-full bg-white rounded flex">
                                                    <div className="w-[60%] p-2 space-y-1 block border-r border-gray-100">
                                                        <div className="h-2 w-1/2 bg-gray-300 rounded"></div>
                                                        <div className="h-2 w-full bg-gray-200 rounded mt-3"></div>
                                                        <div className="h-2 w-full bg-gray-200 rounded"></div>
                                                        <div className="h-2 w-full bg-gray-200 rounded"></div>
                                                    </div>
                                                    <div className="w-[40%] p-2 block space-y-2">
                                                        <div className="h-1.5 w-3/4 bg-gray-200 rounded"></div>
                                                        <div className="h-1.5 w-1/2 bg-gray-200 rounded"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-white dark:bg-gray-900 flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-black text-gray-900 dark:text-white">Creative</h3>
                                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Vibrant & Modern</p>
                                                </div>
                                                {selectedTemplate === 'creative' && <div className="bg-primary text-white p-1 rounded-full"><Check size={16} /></div>}
                                            </div>
                                        </div>

                                        {/* Template 4: Minimalist */}
                                        <div 
                                            onClick={() => setSelectedTemplate('minimalist')} 
                                            className={`cursor-pointer rounded-2xl border-2 overflow-hidden transition-all duration-300 ${selectedTemplate === 'minimalist' ? 'border-primary ring-4 ring-primary/20 shadow-xl scale-[1.02]' : 'border-gray-200 dark:border-gray-800 hover:border-primary/50'}`}
                                        >
                                            <div className="h-40 bg-gray-100 flex flex-col p-4">
                                                <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
                                                <div className="h-1.5 w-1/3 bg-gray-200 rounded mt-1"></div>
                                                <div className="h-2 w-1/4 bg-gray-300 rounded mt-4"></div>
                                                <div className="h-1 w-full bg-gray-200 rounded mt-1"></div>
                                                <div className="h-1 w-3/4 bg-gray-200 rounded mt-1"></div>
                                            </div>
                                            <div className="p-4 bg-white dark:bg-gray-900 flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-black text-gray-900 dark:text-white">Minimalist</h3>
                                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Clean & Simple</p>
                                                </div>
                                                {selectedTemplate === 'minimalist' && <div className="bg-primary text-white p-1 rounded-full"><Check size={16} /></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Live Preview */}
                    <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col print:w-full print:absolute print:top-0 print:left-0 print:m-0 print:p-0 print:block">
                        <div className="sticky top-24 print:static">
                            <div className="mb-4 flex items-center justify-between print:hidden">
                                <h2 className="text-sm font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Live Preview</h2>
                                <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full capitalize">{selectedTemplate} Template</span>
                            </div>
                            
                            {/* PDF Container - A4 aspect ratio approximation scale to fit container */}
                            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-white print:border-none print:shadow-none print:rounded-none">
                                <div ref={previewRef} className="w-full bg-white print:block overflow-y-auto max-h-[800px] print:max-h-none print:overflow-visible custom-scrollbar">
                                    <style>{`
                                        @media print {
                                            body * {
                                                visibility: hidden;
                                            }
                                            #resume-preview, #resume-preview * {
                                                visibility: visible;
                                            }
                                            #resume-preview {
                                                position: absolute;
                                                left: 0;
                                                top: 0;
                                                width: 100%;
                                            }
                                            @page { margin: 0; }
                                        }
                                    `}</style>
                                    <div id="resume-preview">
                                        {renderTemplate()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;
