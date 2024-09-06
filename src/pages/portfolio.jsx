import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import PortfolioModal from '../components/PortfolioModal';
function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  // Define categories
  const categories = ['All', 'Web', 'App', 'Design'];

  // Sample projects data
  const projects = [
    { 
      id: 1, 
      imageSrc: '/BedSyncStaffImage.png', 
      title: 'Bed Sync Staff', 
      demoText: 'Demo →', 
      category: 'Web',
      description: 'A web application for managing staff schedules in hospitals.',
      technologies: 'Html 5, Css 3, Javascript',
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example',
    },
    { 
      id: 2, 
      imageSrc: '/path/to/image2.jpg', 
      title: 'Web Project', 
      demoText: 'Demo →', 
      category: 'Web',
      description: 'An e-commerce platform built with React.',
      technologies: 'React, Node.js, MongoDB',
      liveLink: 'https://example2.com',
      githubLink: 'https://github.com/example2',
    },
    { 
      id: 3, 
      imageSrc: '/path/to/image3.jpg', 
      title: 'Design Concept', 
      demoText: 'Demo →', 
      category: 'Design',
      description: 'A modern website design concept.',
      technologies: 'Figma, Adobe XD',
      liveLink: 'https://example3.com',
      githubLink: 'https://github.com/example3',
    },
    // Add more projects as needed
  ];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Handle project card click
  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedProject(null);
  };

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
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <PortfolioModal 
          isOpen={!!selectedProject} 
          onClose={closeModal} 
          project={selectedProject} 
        />
      )}
    </div>
  );
}

export default Portfolio;
