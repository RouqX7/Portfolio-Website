import React, { useState, useEffect } from 'react';
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer'; // Import Intersection Observer
import ExperienceCard from "../components/ExperienceCard";
import EducationCard from "../components/EducationCard";
import SkillsCard from "../components/SkillsCard";
import DownloadCVButton from "../components/DownloadCVButton";
import { ResumeService } from '../services/resumeService';

function Resume() {
    const [selectedCategory, setSelectedCategory] = useState('Experience');
    const [experienceData, setExperienceData] = useState([]);
    const [educationData, setEducationData] = useState([]);
    const [aboutMeData, setAboutMeData] = useState("I am a passionate developer with a strong interest in web technologies.");
    const [loading, setLoading] = useState(true);

    const categories = ['Experience', 'Education', 'Skills', 'About me'];

    const skillsData = ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'TailwindCSS'];

    // Fetch data from Firebase
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [experiences, education, aboutMe] = await Promise.all([
                    ResumeService.getAllExperiences(),
                    ResumeService.getAllEducation(),
                    ResumeService.getAboutMe()
                ]);
                
                // Transform experience data for ExperienceCard
                const transformedExperiences = experiences.map(exp => ({
                    id: exp.id,
                    year: exp.endDate ? `${exp.startDate} - ${exp.endDate}` : `${exp.startDate} - Present`,
                    title: exp.title,
                    description: exp.company
                }));

                // Transform education data for EducationCard
                const transformedEducation = education.map(edu => ({
                    id: edu.id,
                    year: edu.endDate ? `${edu.startDate} - ${edu.endDate}` : `${edu.startDate} - Present`,
                    title: edu.degree,
                    institution: edu.institution
                }));

                setExperienceData(transformedExperiences);
                setEducationData(transformedEducation);
                
                if (aboutMe && aboutMe.content) {
                    setAboutMeData(aboutMe.content);
                }
            } catch (error) {
                console.error('Error fetching resume data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Intersection Observer to trigger animations when elements are in view
    const [ref, inView] = useInView({
        triggerOnce: true, // Trigger animations only once
        threshold: 0.3,    // Trigger when 30% of the component is visible
    });

    // Trail for category buttons
    const trailCategories = useTrail(categories.length, {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        from: { opacity: 0, transform: 'translateY(20px)' },
        config: { mass: 1, tension: 80, friction: 26 },
        delay: 200,
    });

    // Trail for the "Resume" and "Most Recent work" text
    const textTrail = useTrail(2, {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        from: { opacity: 0, transform: 'translateY(20px)' },
        config: { mass: 1, tension: 80, friction: 26 },
        delay: 400,
    });

    // Set the content to be animated using trail, but ensure useTrail is always called
    const data = selectedCategory === 'Experience'
        ? experienceData
        : selectedCategory === 'Education'
        ? educationData
        : selectedCategory === 'Skills'
        ? skillsData
        : []; // Empty array for "About me"

    // Always call useTrail, even if there's no content to animate for some categories (like "About Me")
    const trailContent = useTrail(data.length, {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        from: { opacity: 0, transform: 'translateY(20px)' },
        config: { mass: 1, tension: 80, friction: 26 },
        delay: 600,
    });

    if (loading) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4'></div>
                    <p className='text-xl text-gray-600 font-poppins'>Loading resume...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
            <div className='max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12'>
                <div className='flex flex-col font-poppins'>
            {/* Text Section for Resume and Most Recent Work */}
            <div ref={ref} className="mb-12">
                {textTrail.map((style, index) => (
                    <animated.div key={index} style={style} className='text-center'>
                        {index === 0 ? (
                            <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent'>Resume</h1>
                        ) : (
                            <h2 className='text-xl md:text-2xl mt-4 text-gray-600 font-medium'>Most Recent Work</h2>
                        )}
                    </animated.div>
                ))}
            </div>

            <div className='flex flex-col lg:flex-row gap-8'>
                {/* Categories on the left side */}
                <div className='lg:w-1/4 w-full'>
                    <div className='flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0'>
                        {trailCategories.map((style, index) => (
                            <animated.div
                                key={categories[index]}
                                style={style}
                                className={`cursor-pointer shadow-lg px-6 py-4 rounded-xl transition-all duration-300 whitespace-nowrap lg:whitespace-normal transform hover:scale-105 ${
                                    selectedCategory === categories[index]
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl'
                                        : 'bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white border-2 border-transparent hover:border-blue-200'
                                }`}
                                onClick={() => setSelectedCategory(categories[index])}
                            >
                                <h2 className="text-lg font-semibold">{categories[index]}</h2>
                            </animated.div>
                        ))}
                    </div>
                </div>

                {/* Content on the right side */}
                <div className="lg:w-3/4 w-full">
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border-2 border-white/50">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                        {selectedCategory === 'Experience' && (
                            trailContent.map((style, index) => (
                                <animated.div key={experienceData[index].id} style={style}>
                                    <ExperienceCard
                                        year={experienceData[index].year}
                                        title={experienceData[index].title}
                                        description={experienceData[index].description}
                                    />
                                </animated.div>
                            ))
                        )}

                        {selectedCategory === 'Education' && (
                            trailContent.map((style, index) => (
                                <animated.div key={educationData[index].id} style={style}>
                                    <EducationCard
                                        year={educationData[index].year}
                                        title={educationData[index].title}
                                        institution={educationData[index].institution}
                                    />
                                </animated.div>
                            ))
                        )}

                        {selectedCategory === 'Skills' && (
                            <animated.div style={trailContent[0]}>
                                <SkillsCard skills={skillsData} />
                            </animated.div>
                        )}

                        {selectedCategory === 'About me' && (
                            <div className="col-span-1 sm:col-span-2">
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 md:p-8 border-2 border-blue-100">
                                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">{aboutMeData}</p>
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>

                {/* Download CV Button */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                    <DownloadCVButton />
                    <a
                        href="/cv-video"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
                    >
                        Watch My CV Video
                    </a>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Resume;
