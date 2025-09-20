import React, { useState } from 'react';
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import ProjectCard from '../components/ProjectCard';
import PortfolioModal from '../components/PortfolioModal';

function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Web', 'Mobile', 'Design'];

  const projects = [
    { 
      id: 1, 
      imageSrc: '/PortfolioImage.png', 
      title: 'RavKaptures', 
      demoText: 'View Project →', 
      category: 'Web',
      description: 'Professional photography and videography portfolio website showcasing creative work, client galleries, and booking services.',
      technologies: 'React, Tailwind CSS, Firebase, Responsive Design',
      liveLink: 'https://ravkaptures-f58d9.web.app',
      githubLink: 'https://github.com/RouqX7/RavKaptures',
      featured: true,
    },
    { 
      id: 2, 
      imageSrc: '/PortfolioImage.png', 
      title: 'LinkUp', 
      demoText: 'View Project →', 
      category: 'Mobile',
      description: 'Social networking mobile app for connecting people with similar interests, goals, and professional backgrounds.',
      technologies: 'React Native, Firebase, Social APIs, Real-time Chat',
      liveLink: 'https://linkup-5601e.web.app',
      githubLink: 'https://github.com/RouqX7/LinkUp',
      featured: true,
    },
    { 
      id: 3, 
      imageSrc: '/PortfolioImage.png', 
      title: 'IWasHere', 
      demoText: 'View Project →', 
      category: 'Mobile',
      description: 'Location-based social app for users to check-in, share experiences, and discover places around them.',
      technologies: 'React Native, Firebase, Geolocation, Maps Integration',
      liveLink: 'https://iwashere-c4c46.web.app',
      githubLink: 'https://github.com/RouqX7/IWasHere',
      featured: false,
    },
    { 
      id: 4, 
      imageSrc: '/PortfolioImage.png', 
      title: 'PayLite', 
      demoText: 'View Project →', 
      category: 'Web',
      description: 'Lightweight payment processing solution for small businesses and startups with minimal setup requirements.',
      technologies: 'React, Node.js, Stripe API, MongoDB',
      liveLink: 'https://paylite-demo.web.app',
      githubLink: 'https://github.com/RouqX7/PayLite',
      featured: true,
    },
    { 
      id: 5, 
      imageSrc: '/PortfolioImage.png', 
      title: 'Southeast Energy Brokers', 
      demoText: 'View Project →', 
      category: 'Web',
      description: 'Energy brokerage website for southeast region providing energy services, quotes, and customer management.',
      technologies: 'React, Tailwind CSS, Firebase, Energy APIs',
      liveLink: 'https://southeast2785.web.app',
      githubLink: 'https://github.com/RouqX7/southeastenergybrokers',
      featured: false,
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

  // Intersection Observer to trigger animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Trail animation for heading
  const trailItems = [
    <h1 key="heading" className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent text-center font-poppins'>Portfolio</h1>,
    <h2 key="subheading" className='text-xl md:text-2xl mt-4 text-gray-600 text-center font-poppins max-w-2xl mx-auto'>Showcasing my latest work and creative solutions</h2>,
  ];

  const trailText = useTrail(trailItems.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    config: { tension: 120, friction: 80 },
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
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    config: { tension: 100, friction: 60 },
  });

  return (
    <div className='min-h-screen flex flex-col p-6 md:p-12 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'> 
      {/* Portfolio Heading Section */}
      <div ref={ref} className='text-center mb-16'>
        {trailText.map((style, index) => (
          <animated.div key={index} style={style}>
            {trailItems[index]}
          </animated.div>
        ))}
      </div>

      {/* Category Filter Buttons */}
      <div className='flex justify-center mb-16'>
        <div className='flex flex-wrap justify-center gap-4 max-w-2xl'>
          {trailCategories.map((style, index) => (
            <animated.div
              key={categories[index]}
              style={style}
              className={`cursor-pointer px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === categories[index]
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200 hover:border-blue-300 shadow-md hover:shadow-lg'
              }`}
              onClick={() => setSelectedCategory(categories[index])}
            >
              {categories[index]}
            </animated.div>
          ))}
        </div>
      </div>

      {/* Featured Projects Section */}
      {selectedCategory === 'All' && (
        <div className='mb-16'>
          <h3 className='text-2xl font-semibold text-gray-800 text-center mb-8 font-poppins'>Featured Projects</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
            {trailCards.map((style, index) => {
              const project = filteredProjects[index];
              if (project?.featured) {
                return (
                  <animated.div key={project.id} style={style} className='transform hover:scale-105 transition-transform duration-300'>
                    <div className='bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100'>
                      <div className='relative'>
                        <img
                          src={project.imageSrc}
                          alt={project.title}
                          className='w-full h-48 object-cover'
                        />
                        <div className='absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium'>
                          Featured
                        </div>
                      </div>
                      <div className='p-6'>
                        <h4 className='text-xl font-bold text-gray-800 mb-2'>{project.title}</h4>
                        <p className='text-gray-600 text-sm mb-4 line-clamp-2'>{project.description}</p>
                        <div className='flex items-center justify-between'>
                          <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full'>{project.category}</span>
                          <button
                            onClick={() => handleProjectClick(project)}
                            className='text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline transition-colors'
                          >
                            {project.demoText}
                          </button>
                        </div>
                      </div>
                    </div>
                  </animated.div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}

      {/* All Projects Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
        {trailCards.map((style, index) => (
          <animated.div key={filteredProjects[index].id} style={style} className='transform hover:scale-105 transition-transform duration-300'>
            <ProjectCard 
              imageSrc={filteredProjects[index].imageSrc} 
              title={filteredProjects[index].title} 
              demoText={filteredProjects[index].demoText} 
              onClick={() => handleProjectClick(filteredProjects[index])}
              category={filteredProjects[index].category}
              featured={filteredProjects[index].featured}
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
