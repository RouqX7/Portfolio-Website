import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { BlogService } from '../services/blogService';
import { ProjectService } from '../services/projectService';
import { FaArrowRight, FaCalendar } from 'react-icons/fa';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [blogsData, projectsData] = await Promise.all([
          BlogService.getAllBlogs(),
          ProjectService.getAllProjects()
        ]);
        setBlogs(blogsData);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getProjectTitle = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project && project.title ? project.title : 'Unknown Project';
  };

  const getProjectImage = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project && project.imageSrc ? project.imageSrc : null;
  };

  const formatDate = (date) => {
    if (!date) return '';
    try {
      const d = date.toDate ? date.toDate() : new Date(date);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (error) {
      return '';
    }
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const trailItems = [
    <h1 key="heading" className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent text-center font-poppins'>Blogs</h1>,
    <h2 key="subheading" className='text-lg md:text-xl mt-2 text-gray-600 text-center font-poppins max-w-2xl mx-auto'>Project stories, insights, and development journeys</h2>,
  ];

  const trailText = useTrail(trailItems.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    config: { mass: 1, tension: 80, friction: 26 },
    delay: 200,
  });

  const trailCards = useTrail(blogs.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    config: { mass: 1, tension: 80, friction: 26 },
    delay: 400,
  });

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-lg text-gray-600 font-poppins'>Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
      <div className='max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16'>
        {/* Header */}
        <div ref={ref} className='text-center mb-12 md:mb-16'>
          {trailText.map((style, index) => (
            <animated.div key={index} style={style}>
              {trailItems[index]}
            </animated.div>
          ))}
        </div>

        {/* Blogs Grid */}
        {blogs.length === 0 ? (
          <div className='text-center py-16'>
            <p className='text-lg text-gray-600 font-poppins'>No blogs available yet. Check back soon!</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {blogs.map((blog, index) => {
              const projectImage = getProjectImage(blog.projectId);
              const firstSectionWithPhoto = blog.sections.find(s => s.photos && s.photos.length > 0);
              const displayImage = projectImage || (firstSectionWithPhoto && firstSectionWithPhoto.photos && firstSectionWithPhoto.photos[0]);

              return (
                <animated.div key={blog.id} style={trailCards[index]}>
                  <Link
                    to={`/blogs/${blog.id}`}
                    className='block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group'
                  >
                    {/* Image */}
                    {displayImage && (
                      <div className='relative h-40 overflow-hidden bg-gray-200'>
                        <img
                          src={displayImage}
                          alt={blog.title}
                          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                      </div>
                    )}

                    {/* Content */}
                    <div className='p-5'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full'>
                          {getProjectTitle(blog.projectId)}
                        </span>
                        {blog.createdAt && (
                          <div className='flex items-center text-xs text-gray-500'>
                            <FaCalendar className='mr-1' />
                            {formatDate(blog.createdAt)}
                          </div>
                        )}
                      </div>
                      <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors'>
                        {blog.title}
                      </h3>
                      <p className='text-sm text-gray-600 mb-4'>
                        {blog.sections.length} section{blog.sections.length !== 1 ? 's' : ''}
                      </p>
                      <div className='flex items-center text-blue-600 font-medium group-hover:text-blue-700'>
                        <span>Read More</span>
                        <FaArrowRight className='ml-2 group-hover:translate-x-1 transition-transform' />
                      </div>
                    </div>
                  </Link>
                </animated.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

