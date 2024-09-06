import React from 'react';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaFigma } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs } from 'react-icons/si';

function SkillsCard() {
    const skills = [
        { name: 'HTML5', icon: <FaHtml5 size={50} /> },
        { name: 'CSS3', icon: <FaCss3Alt size={50} /> },
        { name: 'JavaScript', icon: <FaJsSquare size={50} /> },
        { name: 'React.js', icon: <FaReact size={50} /> },
        { name: 'Next.js', icon: <SiNextdotjs size={50} /> },
        { name: 'TailwindCSS', icon: <SiTailwindcss size={50} /> },
        { name: 'Node.js', icon: <FaNodeJs size={50} /> },
        { name: 'Figma', icon: <FaFigma size={50} /> },
    ];

    return (
        <div>
            <h2 className='text-lg font-bold text-black font-poppins mb-4'>Skills</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2  max-h-72 w-[600px] overflow-y-auto">
                {skills.map((skill, index) => (
                    <div 
                        key={index} 
                        className='flex items-center justify-center p-4 bg-gray-100 shadow-sm text-gray-900 rounded-lg relative group'
                    >
                        {skill.icon}
                        <span className='absolute bottom-0  px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity'>
                            {skill.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SkillsCard;
