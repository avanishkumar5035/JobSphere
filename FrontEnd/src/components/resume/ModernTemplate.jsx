import React from 'react';

const ModernTemplate = ({ data }) => {
    return (
        <div className="bg-white text-gray-900 shadow-xl mx-auto overflow-hidden" style={{ width: '100%', minHeight: '1056px', display: 'flex', flexDirection: 'row' }}>
            {/* Left Sidebar */}
            <div className="w-[30%] bg-primary text-white p-6 flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter leading-tight uppercase w-full break-words">{data.personalInfo.name || 'Your Name'}</h1>
                    <p className="text-sm text-primary-100 font-bold uppercase tracking-widest mt-2">{data.personalInfo.title || 'Professional Title'}</p>
                </div>

                <div className="space-y-3 text-sm mt-4">
                    {data.personalInfo.email && (
                        <div>
                            <p className="text-primary-200 text-xs font-black uppercase mb-0.5">Email</p>
                            <p className="break-all">{data.personalInfo.email}</p>
                        </div>
                    )}
                    {data.personalInfo.phone && (
                        <div>
                            <p className="text-primary-200 text-xs font-black uppercase mb-0.5">Phone</p>
                            <p>{data.personalInfo.phone}</p>
                        </div>
                    )}
                    {data.personalInfo.location && (
                        <div>
                            <p className="text-primary-200 text-xs font-black uppercase mb-0.5">Location</p>
                            <p>{data.personalInfo.location}</p>
                        </div>
                    )}
                    {(data.personalInfo.linkedin || data.personalInfo.github) && (
                        <div className="pt-4 space-y-2">
                            {data.personalInfo.linkedin && <p className="truncate"><span className="text-primary-200 font-bold">in/</span> {data.personalInfo.linkedin}</p>}
                            {data.personalInfo.github && <p className="truncate"><span className="text-primary-200 font-bold">git/</span> {data.personalInfo.github}</p>}
                        </div>
                    )}
                </div>

                {data.skills.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-lg font-black uppercase tracking-widest border-b border-primary-300 pb-2 mb-4">Skills</h2>
                        <ul className="space-y-1">
                            {data.skills.map((skill, index) => (
                                <li key={index} className="text-sm flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-white before:rounded-full before:mr-2">
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Right Content */}
            <div className="w-[70%] p-8 bg-white print:bg-white flex flex-col gap-6">
                {data.summary && (
                    <section>
                        <h2 className="text-xl font-black text-gray-800 uppercase tracking-widest border-b-2 border-primary pb-2 mb-3">Profile</h2>
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{data.summary}</p>
                    </section>
                )}

                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-xl font-black text-gray-800 uppercase tracking-widest border-b-2 border-primary pb-2 mb-4">Experience</h2>
                        <div className="space-y-5">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900">{exp.role}</h3>
                                        <span className="text-xs font-bold text-primary uppercase tracking-widest">{exp.duration}</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700 mb-2">{exp.company}</p>
                                    <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.education.length > 0 && (
                    <section>
                        <h2 className="text-xl font-black text-gray-800 uppercase tracking-widest border-b-2 border-primary pb-2 mb-4">Education</h2>
                        <div className="space-y-4">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                        <span className="text-xs font-bold text-primary uppercase tracking-widest">{edu.year}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{edu.school}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ModernTemplate;
