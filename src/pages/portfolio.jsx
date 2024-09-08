import React, { useState } from 'react';
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer'; // Import Intersection Observer
import ProjectCard from '../components/ProjectCard';
import PortfolioModal from '../components/PortfolioModal';

function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Web', 'App', 'Design'];

  const projects = [
    { 
      id: 1, 
      imageSrc: '/BedSyncStaffImage.png', 
      title: 'Bed Sync Staff', 
      demoText: 'Demo →', 
      category: 'Web',
      description: 'A web application for managing staff schedules in hospitals.',
      technologies: 'Html 5, Css 3, Javascript',
      liveLink: '/FantasyDemo.mp4', 
      githubLink: 'https://github.com/RouqX7/Bed-Sync-Staff',
    },
    { 
      id: 2, 
      imageSrc: '/FantasyImage.png', 
      title: 'FantasySports', 
      demoText: 'Demo →', 
      category: 'Web',
      description: 'An e-commerce platform built with React.',
      technologies: 'React, Node.js, MongoDB',
      liveLink: '/FantasyDemo.mp4', 
      githubLink: 'https://github.com/RouqX7/FantasySports',
    },
    { 
      id: 3, 
      imageSrc: 'BedSyncAdminImage.png', 
      title: 'Bed Sync Admin', 
      demoText: 'Demo →', 
      category: 'Design',
      description: 'A modern website design concept.',
      technologies: 'Figma, Adobe XD',
      liveLink: 'https://example3.com',
      githubLink: 'https://github.com/RouqX7/BedSync-Admin',
    },
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

  // Intersection Observer to trigger animations for heading and projects when they are in view
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3, // Trigger when 30% of the section is in view
  });

  // Elements to animate using trail
  const trailItems = [
    <h1 key="heading" className='text-4xl font-bold text-gray-800 text-center font-poppins'>Portfolio</h1>,
    <h2 key="subheading" className='text-md mt-2 text-gray-600 text-center font-poppins'>Most Recent Work</h2>,
  ];

  // Trail animation for the heading and subheading
  const trailText = useTrail(trailItems.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 100, friction: 80 },
  });

  // Trail animation for category buttons
  const trailCategories = useTrail(categories.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 150, friction: 50 },
  });

  // Trail animation for project cards
  const trailCards = useTrail(filteredProjects.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 100, friction: 60 },
  });

  return (
    <div className='min-h-screen flex flex-col p-8'> 
      {/* Portfolio Heading and Subheading */}
      <div ref={ref}>
        {trailText.map((style, index) => (
          <animated.div key={index} style={style}>
            {trailItems[index]}
          </animated.div>
        ))}
      </div>

      {/* Container for the category buttons */}
      <div className='flex justify-center mt-10 font-poppins'>
        <div className='flex space-x-4'>
          {trailCategories.map((style, index) => (
            <animated.div
              key={categories[index]}
              style={style}
              className={`cursor-pointer shadow-sm px-4 py-2 rounded-md transition duration-300 ${
                selectedCategory === categories[index]
                  ? 'bg-black text-white'
                  : 'bg-gray-100 hover:bg-black hover:text-white'
              }`}
              onClick={() => setSelectedCategory(categories[index])}
            >
              <h1>{categories[index]}</h1>
            </animated.div>
          ))}
        </div>
      </div>

      {/* Project cards displayed based on selected category */}
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {trailCards.map((style, index) => (
          <animated.div key={filteredProjects[index].id} style={style}>
            <ProjectCard 
              imageSrc={filteredProjects[index].imageSrc} 
              title={filteredProjects[index].title} 
              demoText={filteredProjects[index].demoText} 
              onClick={() => handleProjectClick(filteredProjects[index])}
            />
          </animated.div>
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
