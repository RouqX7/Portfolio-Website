import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';

function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Define categories
  const categories = ['All', 'Web', 'App', 'Design'];

  // Sample projects data
  const projects = [
    { id: 1, imageSrc: '/path/to/image1.jpg', title: 'App movil', demoText: 'Demo →', category: 'App' },
    { id: 2, imageSrc: '/path/to/image2.jpg', title: 'Web Project', demoText: 'Demo →', category: 'Web' },
    { id: 3, imageSrc: '/path/to/image3.jpg', title: 'Design Concept', demoText: 'Demo →', category: 'Design' },
    // Add more projects as needed
  ];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className='min-h-screen flex flex-col p-8'> 
      <h1 className='text-4xl font-bold text-gray-800 text-center'>Portfolio</h1>
      <h2 className='text-md mt-2 text-gray-600 text-center'>Most Recent work</h2>

      {/* Container for the category buttons */}
      <div className='flex justify-center mt-10'>
        <div className='flex space-x-4'>
          {categories.map(category => (
            <div
              key={category}
              className={`cursor-pointer shadow-sm px-4 py-2 rounded-md transition duration-300 ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 hover:bg-black hover:text-white'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <h1>{category}</h1>
            </div>
          ))}
        </div>
      </div>

      {/* Project cards displayed based on selected category */}
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredProjects.map(project => (
          <ProjectCard 
            key={project.id}
            imageSrc={project.imageSrc} 
            title={project.title} 
            demoText={project.demoText} 
            category={project.category} 
          />
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
