import React from 'react';

const MinimalistTemplate = ({ data }) => {
    return (
        <div className="bg-white text-gray-900 mx-auto p-12 font-sans overflow-hidden" style={{ width: '100%', minHeight: '1056px', maxWidth: '850px' }}>
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-1">{data.personalInfo.name || 'Your Name'}</h1>
                <p className="text-lg text-gray-500 font-medium mb-4">{data.personalInfo.title || 'Professional Title'}</p>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                    {data.personalInfo.email && <span className="flex items-center gap-1">{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span className="flex items-center gap-1">{data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span className="flex items-center gap-1">{data.personalInfo.location}</span>}
                    {data.personalInfo.linkedin && <span className="flex items-center gap-1">linkedin.com/in/{data.personalInfo.linkedin}</span>}
                    {data.personalInfo.github && <span className="flex items-center gap-1">github.com/{data.personalInfo.github}</span>}
                </div>
            </header>

            <div className="space-y-8 text-gray-800">
                {/* Summary */}
                {data.summary && (
                    <section>
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Summary</h2>
                        <p className="text-base leading-relaxed whitespace-pre-wrap">{data.summary}</p>
                    </section>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Experience</h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-semibold text-lg text-gray-900">{exp.role}</h3>
                                        <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{exp.duration}</span>
                                    </div>
                                    <p className="text-base text-gray-600 mb-2">{exp.company}</p>
                                    <p className="text-base leading-relaxed whitespace-pre-wrap">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Education</h2>
                        <div className="space-y-4">
                            {data.education.map((edu, index) => (
                                <div key={index} className="flex justify-between items-baseline">
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-900">{edu.degree}</h3>
                                        <p className="text-base text-gray-600">{edu.school}</p>
                                    </div>
                                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{edu.year}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Skills</h2>
                        <p className="text-base leading-relaxed">
                            {data.skills.join(', ')}
                        </p>
                    </section>
                )}
            </div>
        </div>
    );
};

export default MinimalistTemplate;
