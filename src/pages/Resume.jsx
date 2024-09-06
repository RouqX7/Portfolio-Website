import React, { useState } from 'react';
import ExperienceCard from "../components/ExperienceCard";
import EducationCard from "../components/EducationCard";
import SkillsCard from "../components/SkillsCard";

function Resume() {
    const [selectedCategory, setSelectedCategory] = useState('Experience');

    const categories = ['Experience', 'Education', 'Skills', 'About me'];

    const experienceData = [
        { id: 1, year: '2022', title: 'Software Test Engineer', description: 'Valeo Vision Systems' },
        { id: 2, year: '2021', title: 'Frontend Developer at ABC', description: 'Led the UI/UX design...' },
    ];

    const educationData = [
        { id: 3, year: '2023', title: 'Computer System Bachelors Degree', institution: 'University' },
        { id: 4, year: '2022', title: 'Front-end Track', institution: 'Codecademy' },
    ];

    const skillsData = [
        'JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'TailwindCSS',
    ];

    const aboutMeData = "I am a passionate developer with a strong interest in web technologies.";

    return (
        <div className='min-h-screen flex flex-col'> 
            <h1 className='text-4xl font-bold text-gray-800 text-center font-poppins'>Resume</h1>
            <h2 className='text-md mt-2 text-gray-600 text-center'>Most Recent work</h2>

            <div className='mt-10 flex flex-col md:flex-row p-0 md:p-8  text-white'>
                {/* Categories on the left side */}
                <div className='flex flex-col space-y-4 md:w-1/4 text-center md:min-w-max md:ml-0 p-4'>
                    {categories.map(category => (
                        <div
                            key={category}
                            className={`cursor-pointer shadow-md px-4 py-2 rounded-md transition duration-300 ${
                                selectedCategory === category
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white text-black hover:bg-gray-900 hover:text-white'
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            <h1>{category}</h1>
                        </div>
                    ))}
                </div>

                {/* Content on the right side */}
                <div className="mt-10 md:mt-0 md:ml-10 md:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4  rounded-lg overflow-y-auto" style={{ maxHeight: '40rem' }}>
                        {selectedCategory === 'Experience' && experienceData.map(item => (
                            <ExperienceCard key={item.id} year={item.year} title={item.title} description={item.description} />
                        ))}

                        {selectedCategory === 'Education' && educationData.map(item => (
                            <EducationCard key={item.id} year={item.year} title={item.title} institution={item.institution} />
                        ))}

                        {selectedCategory === 'Skills' && (
                            <SkillsCard skills={skillsData} />
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
