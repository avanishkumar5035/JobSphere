import React from 'react';

const CreativeTemplate = ({ data }) => {
    return (
        <div className="bg-[#f8f9fa] text-gray-800 shadow-xl mx-auto overflow-hidden relative" style={{ width: '100%', minHeight: '1056px' }}>
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-bl-full -z-0"></div>
            <div className="absolute top-40 left-0 w-32 h-32 bg-[#ff6b6b]/10 rounded-br-full -z-0"></div>
            
            <div className="relative z-10 flex flex-col pt-12 pb-8 px-12 h-full">
                {/* Header */}
                <header className="flex justify-between items-center mb-10 border-b-4 border-primary pb-6">
                    <div className="w-[60%]">
                        <h1 className="text-5xl font-black tracking-tighter text-gray-900 uppercase">
                            {data.personalInfo.name || 'Your Name'}
                        </h1>
                        <p className="text-xl text-primary font-bold tracking-widest uppercase mt-2">
                            {data.personalInfo.title || 'Professional Title'}
                        </p>
                    </div>
                    <div className="w-[35%] text-right text-sm space-y-1.5 font-medium">
                        {data.personalInfo.email && <p className="text-gray-600">{data.personalInfo.email}</p>}
                        {data.personalInfo.phone && <p className="text-gray-600">{data.personalInfo.phone}</p>}
                        {data.personalInfo.location && <p className="text-gray-600">{data.personalInfo.location}</p>}
                        {data.personalInfo.linkedin && <p className="text-primary font-semibold">in/{data.personalInfo.linkedin}</p>}
                        {data.personalInfo.github && <p className="text-primary font-semibold">git/{data.personalInfo.github}</p>}
                    </div>
                </header>

                <div className="flex flex-row gap-10 flex-grow">
                    {/* Left Column */}
                    <div className="w-[60%] flex flex-col gap-8">
                        {data.summary && (
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-black text-xl shadow-lg">01</div>
                                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-widest">About Me</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed font-medium bg-white p-5 rounded-2xl shadow-sm border border-gray-100 whitespace-pre-wrap">{data.summary}</p>
                            </section>
                        )}

                        {data.experience.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-black text-xl shadow-lg">02</div>
                                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-widest">Experience</h2>
                                </div>
                                <div className="space-y-6">
                                    {data.experience.map((exp, index) => (
                                        <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary rounded-l-2xl"></div>
                                            <div className="flex justify-between items-start mb-2 pl-2">
                                                <div>
                                                    <h3 className="font-black text-lg text-gray-900">{exp.role}</h3>
                                                    <p className="font-bold text-primary text-sm">{exp.company}</p>
                                                </div>
                                                <span className="text-xs font-black bg-gray-100 text-gray-600 px-3 py-1 rounded-full uppercase tracking-wider">{exp.duration}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed pl-2 mt-2 font-medium">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="w-[40%] flex flex-col gap-8">
                        {data.education.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white font-black shadow-lg">E</div>
                                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest">Education</h2>
                                </div>
                                <div className="space-y-4">
                                    {data.education.map((edu, index) => (
                                        <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                            <span className="text-xs font-black text-primary uppercase tracking-widest block mb-1">{edu.year}</span>
                                            <h3 className="font-bold text-gray-900 leading-tight">{edu.degree}</h3>
                                            <p className="text-sm text-gray-500 mt-1">{edu.school}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {data.skills.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white font-black shadow-lg">S</div>
                                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest">Skills</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill, index) => (
                                        <span key={index} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeTemplate;
