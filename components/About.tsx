import React from 'react';
import { SKILLS, EXPERIENCE, EDUCATION, ONLINE_COURSES, SERVICES } from '../constants';
import type { ExperienceItem, EducationItem, OnlineCourseItem, Skill, Service } from '../types';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 tracking-tight text-center">{children}</h2>
);

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 transition-all duration-300 hover:bg-slate-800 hover:border-purple-500/50 text-center flex flex-col">
        <div className="flex-shrink-0 mx-auto">
            <i className={`ph-bold ${service.icon} text-4xl text-purple-400 mb-4`}></i>
        </div>
        <div className="flex-grow">
            <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
            <p className="text-sm text-gray-300 mb-4">{service.description}</p>
        </div>
        <span className="text-xs font-semibold text-purple-300 bg-purple-900/50 px-3 py-1 rounded-full mt-auto">
            {service.projects}
        </span>
    </div>
);

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => (
    <div className="flex flex-col items-center justify-center text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 transition-all duration-300 hover:bg-slate-800 hover:border-purple-500/50">
        <div className="w-12 h-12 mb-3 text-purple-400">
             <skill.icon />
        </div>
        <p className="font-semibold text-gray-200 text-sm">{skill.name}</p>
    </div>
);

const renderBold = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part
    );
};

const ExperienceCard: React.FC<{ item: ExperienceItem }> = ({ item }) => (
     <div className="bg-slate-800/40 p-6 rounded-lg border border-slate-700/60 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/30 hover:bg-slate-800/60">
        <p className="text-sm font-medium text-purple-400 mb-1">{item.period}</p>
        <h3 className="text-xl md:text-2xl font-bold text-white">{item.role}</h3>
        <h4 className="text-base md:text-lg font-semibold text-gray-400 mb-4">{item.company}</h4>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
            {item.description.map((point, index) => (
                <li key={index}>{renderBold(point)}</li>
            ))}
        </ul>
    </div>
);

const EducationCard: React.FC<{ item: EducationItem }> = ({ item }) => (
    <div className="bg-slate-800/40 p-6 rounded-lg border border-slate-700/60">
        <p className="text-sm font-medium text-purple-400 mb-1">{item.period}</p>
        <h3 className="text-xl font-bold text-white">{item.degree}</h3>
        <h4 className="text-base text-gray-400">{item.institution}</h4>
    </div>
);

const OnlineCourseCard: React.FC<{ item: OnlineCourseItem }> = ({ item }) => (
    <div className="bg-slate-800/40 p-6 rounded-lg border border-slate-700/60">
        <h3 className="text-xl font-bold text-white">{item.title}</h3>
        <h4 className="text-base text-gray-400">{item.platform}</h4>
    </div>
);


const Resume: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-16 md:space-y-20">
            {/* Services Section */}
            <div>
                <SectionTitle>My Specializations</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SERVICES.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                    ))}
                </div>
            </div>
            
            {/* Skills Section */}
            <div>
                <SectionTitle>Technical Skills</SectionTitle>
                 <div className="space-y-10">
                    {Object.entries(SKILLS).map(([category, skills]) => (
                        <div key={category}>
                            <h3 className="text-2xl font-bold text-purple-400 mb-6 text-center md:text-left">{category}</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                                {skills.map(skill => (
                                    <SkillCard key={skill.name} skill={skill} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Experience Section */}
            <div>
                <SectionTitle>Career Journey</SectionTitle>
                <div className="space-y-8">
                    {EXPERIENCE.map((item, index) => (
                        <ExperienceCard key={index} item={item} />
                    ))}
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-8">
                {/* Education Section */}
                <div>
                    <SectionTitle>Education</SectionTitle>
                    <div className="space-y-6">
                        {EDUCATION.map((item, index) => (
                            <EducationCard key={index} item={item} />
                        ))}
                    </div>
                </div>

                {/* Online Courses Section */}
                <div>
                    <SectionTitle>Online Courses</SectionTitle>
                    <div className="space-y-6">
                        {ONLINE_COURSES.map((item, index) => (
                            <OnlineCourseCard key={index} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;