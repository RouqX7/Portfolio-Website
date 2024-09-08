import React, { useState } from 'react';
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer'; // Import Intersection Observer
import ExperienceCard from "../components/ExperienceCard";
import EducationCard from "../components/EducationCard";
import SkillsCard from "../components/SkillsCard";

function Resume() {
    const [selectedCategory, setSelectedCategory] = useState('Experience');

    const categories = ['Experience', 'Education', 'Skills', 'About me'];

    const experienceData = [
        { id: 1, year: '2022', title: 'Software Test Engineer', description: 'Valeo Vision Systems' },
        { id: 2, year: '2022', title: 'Data Analyst', description: 'Valeo Vision Systems' },
    ];

    const educationData = [
        { id: 3, year: '2023', title: 'Computer System Bachelors Degree', institution: 'University Of Limerick' },
    ];

    const skillsData = ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'TailwindCSS'];

    const aboutMeData = "I am a passionate developer with a strong interest in web technologies.";

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
        config: { tension: 80, friction: 40 },
    });

    // Trail for the "Resume" and "Most Recent work" text
    const textTrail = useTrail(2, {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        from: { opacity: 0, transform: 'translateY(20px)' },
        config: { tension: 80, friction: 40 },
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
        config: { tension: 80, friction: 40 },
    });

    return (
        <div className='min-h-screen flex flex-col font-poppins'>
            {/* Text Section for Resume and Most Recent Work */}
            <div ref={ref}>
                {textTrail.map((style, index) => (
                    <animated.div key={index} style={style} className='text-center'>
                        {index === 0 ? (
                            <h1 className='text-4xl font-bold text-gray-800'>Resume</h1>
                        ) : (
                            <h2 className='text-md mt-2 text-gray-600'>Most Recent work</h2>
                        )}
                    </animated.div>
                ))}
            </div>

            <div className='mt-10 flex flex-col md:flex-row p-0 md:p-8 text-white'>
                {/* Categories on the left side */}
                <div className='flex flex-col space-y-4 md:w-1/4 text-center md:min-w-max md:ml-0 p-4'>
                    {trailCategories.map((style, index) => (
                        <animated.div
                            key={categories[index]}
                            style={style}
                            className={`cursor-pointer shadow-md px-4 py-2 rounded-md transition duration-300 ${
                                selectedCategory === categories[index]
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white text-black hover:bg-gray-900 hover:text-white'
                            }`}
                            onClick={() => setSelectedCategory(categories[index])}
                        >
                            <h1>{categories[index]}</h1>
                        </animated.div>
                    ))}
                </div>

                {/* Content on the right side */}
                <div className="mt-10 md:mt-0 md:ml-10 md:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg overflow-y-auto" style={{ maxHeight: '40rem' }}>
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
                            <div className="text-center col-span-2">
                                <p>{aboutMeData}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Resume;
