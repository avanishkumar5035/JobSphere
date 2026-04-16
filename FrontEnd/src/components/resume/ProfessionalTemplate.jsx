import React from 'react';

const ProfessionalTemplate = ({ data }) => {
    return (
        <div className="bg-white text-gray-900 shadow-xl mx-auto p-10 font-serif overflow-hidden" style={{ width: '100%', minHeight: '1056px' }}>
            {/* Header */}
            <header className="border-b-2 border-gray-800 pb-4 mb-6 text-center">
                <h1 className="text-4xl font-bold uppercase tracking-wide mb-2 text-gray-900">{data.personalInfo.name || 'Your Name'}</h1>
                <div className="text-sm text-gray-700 flex flex-wrap justify-center gap-x-4 gap-y-1">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && (
                        <>
                            <span className="text-gray-400">•</span>
                            <span>{data.personalInfo.phone}</span>
                        </>
                    )}
                    {data.personalInfo.location && (
                        <>
                            <span className="text-gray-400">•</span>
                            <span>{data.personalInfo.location}</span>
                        </>
                    )}
                </div>
                <div className="text-sm text-gray-700 mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1">
                    {data.personalInfo.linkedin && <span>LinkedIn: {data.personalInfo.linkedin}</span>}
                    {data.personalInfo.github && (
                        <>
                            <span className="text-gray-400">•</span>
                            <span>GitHub: {data.personalInfo.github}</span>
                        </>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <div className="space-y-6">
                {/* Summary */}
                {data.summary && (
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
                        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{data.summary}</p>
                    </section>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-3">Professional Experience</h2>
                        <div className="space-y-4">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900 text-base">{exp.role}</h3>
                                        <span className="text-sm font-semibold text-gray-700">{exp.duration}</span>
                                    </div>
                                    <p className="text-sm italic text-gray-700 mb-2">{exp.company}</p>
                                    <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed list-inside list-disc">
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
                        <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-3">Education</h2>
                        <div className="space-y-3">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900 text-base">{edu.school}</h3>
                                        <span className="text-sm font-semibold text-gray-700">{edu.year}</span>
                                    </div>
                                    <p className="text-sm text-gray-800">{edu.degree}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-3">Core Competencies</h2>
                        <p className="text-sm text-gray-800 leading-relaxed">
                            {data.skills.join(' • ')}
                        </p>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ProfessionalTemplate;
