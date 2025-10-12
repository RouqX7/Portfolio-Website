import React, { useState, useEffect } from 'react';
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import ProjectCard from '../components/ProjectCard';
import PortfolioModal from '../components/PortfolioModal';
import { ProjectService } from '../services/projectService';

function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('Featured');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const projectsPerPage = 6; // Show 6 projects per page

  const categories = ['Featured', 'All', 'Web', 'Mobile', 'Desktop', 'Backend', 'Other'];

  // Fetch projects from Firebase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await ProjectService.getAllProjects();
        
        // Remove duplicates by project ID to ensure no duplicates
        const uniqueProjects = projectsData.reduce((acc, current) => {
          const existingProject = acc.find(project => project.id === current.id);
          if (!existingProject) {
            acc.push(current);
          }
          return acc;
        }, []);
        
        console.log('Total projects fetched:', projectsData.length);
        console.log('Unique projects after deduplication:', uniqueProjects.length);
        
        setProjects(uniqueProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'Featured'
    ? projects.filter(project => project.featured === true)
    : selectedCategory === 'All' 
    ? projects // Show all projects without any filtering
    : projects.filter(project => project.category === selectedCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

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
    config: { mass: 1, tension: 80, friction: 26 },
    delay: 200,
  });

  // Trail animation for category buttons
  const trailCategories = useTrail(categories.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: { mass: 1, tension: 80, friction: 26 },
    delay: 400,
  });

  // Trail animation for project cards
  const trailCards = useTrail(currentProjects.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    config: { mass: 1, tension: 80, friction: 26 },
    delay: 600,
  });

  // Loading state
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-xl text-gray-600 font-poppins'>Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
      <div className='max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12'>
      {/* Portfolio Heading Section */}
      <div ref={ref} className='text-center mb-12 md:mb-16'>
        {trailText.map((style, index) => (
          <animated.div key={index} style={style}>
            {trailItems[index]}
          </animated.div>
        ))}
      </div>

      {/* Category Filter Buttons */}
      <div className='flex justify-center mb-12 md:mb-16'>
        <div className='flex flex-wrap justify-center gap-3 md:gap-4 max-w-2xl'>
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

      {/* Featured Projects Section - Only show when Featured is selected */}
      {selectedCategory === 'Featured' && (
        <div className='mb-12 md:mb-16'>
          <h3 className='text-xl md:text-2xl font-semibold text-gray-800 text-center mb-6 md:mb-8 font-poppins'>Featured Projects</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {trailCards.map((style, index) => {
              const project = currentProjects[index];
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
                          View Project →
                        </button>
                      </div>
                    </div>
                  </div>
                </animated.div>
              );
            })}
          </div>
        </div>
      )}

      {/* All Projects Grid - Show for All and category filters */}
      {selectedCategory !== 'Featured' && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {trailCards.map((style, index) => (
            <animated.div key={currentProjects[index].id} style={style} className='transform hover:scale-105 transition-transform duration-300'>
              <ProjectCard 
                imageSrc={currentProjects[index].imageSrc} 
                title={currentProjects[index].title} 
                demoText="View Project →"
                onClick={() => handleProjectClick(currentProjects[index])}
                category={currentProjects[index].category}
                featured={currentProjects[index].featured}
              />
            </animated.div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className='flex justify-center items-center space-x-4 mt-12'>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            Previous
          </button>
          
          <div className='flex space-x-2'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedProject && (
        <PortfolioModal 
          isOpen={!!selectedProject} 
          onClose={closeModal} 
          project={selectedProject} 
        />
      )}
      </div>
    </div>
  );
}

export default Portfolio;
