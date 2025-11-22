import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { BlogService } from '../services/blogService';
import { ProjectService } from '../services/projectService';
import { FaArrowLeft, FaCalendar, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

export default function BlogDetail() {
  const { blogId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [blog, setBlog] = useState(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!blogId) return;
      
      try {
        setLoading(true);
        const blogData = await BlogService.getBlog(blogId);
        if (blogData) {
          setBlog(blogData);
          const projectData = await ProjectService.getProject(blogData.projectId);
          setProject(projectData);
          
          // Collect all images from all sections
          const sortedSections = [...blogData.sections].sort((a, b) => a.order - b.order);
          const images = [];
          sortedSections.forEach((section) => {
            if (section.photos && section.photos.length > 0) {
              section.photos.forEach((photoUrl) => {
                images.push(photoUrl);
              });
            }
          });
          setAllImages(images);
          
          // Get page from URL params or default to 1
          const pageParam = searchParams.get('page');
          const page = pageParam ? parseInt(pageParam, 10) : 1;
          const maxPage = Math.max(1, sortedSections.length);
          setCurrentPage(Math.min(Math.max(1, page), maxPage));
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [blogId, searchParams]);

  // Update URL when page changes
  useEffect(() => {
    if (blog && currentPage > 0) {
      const sortedSections = [...blog.sections].sort((a, b) => a.order - b.order);
      const maxPage = Math.max(1, sortedSections.length);
      if (currentPage <= maxPage) {
        setSearchParams({ page: currentPage.toString() });
      }
    }
  }, [currentPage, blog, setSearchParams]);

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
    threshold: 0.1,
  });

  const trailSections = useTrail(blog?.sections.length || 0, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    config: { mass: 1, tension: 80, friction: 26 },
    delay: 200,
  });

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-xl text-gray-600 font-poppins'>Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>Blog Not Found</h1>
          <Link
            to='/blogs'
            className='text-blue-600 hover:text-blue-700 font-medium'
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const sortedSections = blog ? [...blog.sections].sort((a, b) => a.order - b.order) : [];
  const totalPages = Math.max(1, sortedSections.length);
  const currentSection = sortedSections[currentPage - 1];

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openImageModal = (imageUrl, imageIndex) => {
    setSelectedImage(imageUrl);
    setSelectedImageIndex(imageIndex);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  const navigateImage = (direction) => {
    if (allImages.length === 0) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (selectedImageIndex + 1) % allImages.length;
    } else {
      newIndex = (selectedImageIndex - 1 + allImages.length) % allImages.length;
    }
    
    setSelectedImageIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  // Handle keyboard events for image modal
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeImageModal();
      } else if (e.key === 'ArrowLeft' && allImages.length > 1) {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight' && allImages.length > 1) {
        navigateImage('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedImageIndex, allImages]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
      <div className='max-w-4xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12'>
        {/* Back Button */}
        <Link
          to='/blogs'
          className='inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8 font-poppins'
        >
          <FaArrowLeft className='mr-2' />
          <span>Back to Blogs</span>
        </Link>

        {/* Header */}
        <div ref={ref} className='mb-12'>
          <div className='mb-4'>
            <span className='text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block'>
              {project && project.title ? project.title : 'Project'}
            </span>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-poppins'>
            {blog.title}
          </h1>
          {blog.createdAt && (
            <div className='flex items-center text-gray-600 text-sm'>
              <FaCalendar className='mr-2' />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
          )}
        </div>

        {/* Current Section */}
        {currentSection && (
          <animated.div
            style={trailSections[currentPage - 1] || {}}
            className='bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8'
          >
            {/* Section Title */}
            {currentSection.title && (
              <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-poppins'>
                {currentSection.title}
              </h2>
            )}

            {/* Section Text */}
            {currentSection.text && (
              <div className='prose prose-lg max-w-none mb-6'>
                <p className='text-gray-700 leading-relaxed whitespace-pre-line font-poppins'>
                  {currentSection.text}
                </p>
              </div>
            )}

            {/* Section Photos */}
            {currentSection.photos && currentSection.photos.length > 0 && (
              <div className='mt-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {currentSection.photos.map((photoUrl, photoIndex) => {
                    // Find the global index of this image in allImages
                    const sortedSections = blog ? [...blog.sections].sort((a, b) => a.order - b.order) : [];
                    let globalIndex = 0;
                    for (let i = 0; i < currentPage - 1; i++) {
                      if (sortedSections[i]?.photos) {
                        globalIndex += sortedSections[i].photos.length;
                      }
                    }
                    globalIndex += photoIndex;
                    
                    return (
                      <div
                        key={photoIndex}
                        className='relative group overflow-hidden rounded-lg bg-gray-200 cursor-pointer'
                        onClick={() => openImageModal(photoUrl, globalIndex)}
                      >
                        <img
                          src={photoUrl}
                          alt={currentSection.title ? `${currentSection.title} - Image ${photoIndex + 1}` : `Section image ${photoIndex + 1}`}
                          className='w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300'
                          loading='lazy'
                        />
                        <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center'>
                          <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black bg-opacity-50 px-4 py-2 rounded-lg'>
                            Click to view full size
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </animated.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex flex-col items-center space-y-4'>
              {/* Page Numbers */}
              <div className='flex items-center justify-center space-x-2 flex-wrap gap-2'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className='flex items-center justify-between w-full max-w-md pt-4 border-t border-gray-200'>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                  }`}
                >
                  <FaChevronLeft />
                  <span>Previous</span>
                </button>

                <span className='text-sm text-gray-600 font-medium'>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                  }`}
                >
                  <span>Next</span>
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className='mt-12 pt-8 border-t border-gray-200 flex justify-between items-center'>
          <Link
            to='/blogs'
            className='inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-poppins'
          >
            <FaArrowLeft className='mr-2' />
            <span>Back to Blogs</span>
          </Link>
          {project && (
            <Link
              to='/#portfolio'
              className='inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-poppins'
            >
              <span>View Project</span>
              <FaArrowLeft className='ml-2 rotate-180' />
            </Link>
          )}
        </div>
      </div>

      {/* Image Modal/Lightbox */}
      {selectedImage && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4'
          onClick={closeImageModal}
        >
          {/* Close Button */}
          <button
            onClick={closeImageModal}
            className='absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70'
            aria-label='Close image'
          >
            <FaTimes className='text-2xl' />
          </button>

          {/* Navigation Buttons */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className='absolute left-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70'
                aria-label='Previous image'
              >
                <FaChevronLeft className='text-2xl' />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className='absolute right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70'
                aria-label='Next image'
              >
                <FaChevronRight className='text-2xl' />
              </button>
            </>
          )}

          {/* Image Counter */}
          {allImages.length > 1 && (
            <div className='absolute top-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full text-sm font-medium z-10'>
              {selectedImageIndex + 1} / {allImages.length}
            </div>
          )}

          {/* Image */}
          <div
            className='max-w-7xl max-h-full flex items-center justify-center'
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt='Full size view'
              className='max-w-full max-h-[90vh] object-contain rounded-lg'
            />
          </div>
        </div>
      )}
    </div>
  );
}

