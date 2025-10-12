import React, { useState } from 'react';
import { FaCode, FaServer, FaPalette, FaRocket, FaArrowRight, FaCheck } from 'react-icons/fa';
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import ServicesModal from '../components/ServicesModal';

function Services() {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: '', summary: '', description: '' });

  // Service data for trail animation
  const services = [
    {
      icon: FaCode,
      title: 'Full Stack Development',
      tagline: 'End-to-End Solutions',
      summaryItems: [
        'Modern React & Node.js applications',
        'RESTful APIs with comprehensive validation',
        'Database design and optimization',
        'Cloud deployment and scaling'
      ],
      description: 'Complete web applications from concept to deployment, ensuring seamless integration between frontend and backend systems.',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: FaServer,
      title: 'Backend Architecture',
      tagline: 'Robust & Scalable',
      summaryItems: [
        'Microservices architecture design',
        'Database optimization & caching',
        'Security implementation & monitoring',
        'Performance tuning & load balancing'
      ],
      description: 'Building enterprise-grade backend systems that can handle scale while maintaining security and performance.',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200'
    },
    {
      icon: FaPalette,
      title: 'Frontend Design',
      tagline: 'Beautiful & Functional',
      summaryItems: [
        'Responsive UI/UX design',
        'Modern CSS frameworks & animations',
        'Cross-browser compatibility',
        'Performance optimization'
      ],
      description: 'Creating stunning, user-friendly interfaces that deliver exceptional user experiences across all devices.',
      gradient: 'from-green-500 to-teal-500',
      bgGradient: 'from-green-50 to-teal-50',
      borderColor: 'border-green-200'
    }
  ];
  
  const handleOpenModal = (title, summaryItems, description) => {
    setModalData({ title, summaryItems, description });
    setShowModal(true);
  };

  // Intersection Observer for the text and service boxes
  const [textRef, textInView] = useInView({
    triggerOnce: true, // Trigger only once when visible
    threshold: 0.3,    // Trigger when 30% of the text is visible
  });

  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger only once when visible
    threshold: 0.3,    // Trigger when 30% of the boxes are visible
  });

  // Trail animation for the text ("Services" and "What I offer")
  const textTrail = useTrail(2, {
    opacity: textInView ? 1 : 0,
    transform: textInView ? 'translateY(0)' : 'translateY(20px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { mass: 1, tension: 80, friction: 26 },
    delay: 200,
  });

  // Trail animation for service boxes
  const trail = useTrail(services.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { mass: 1, tension: 80, friction: 26 },
    delay: 400,
  });

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
      <div className='max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12'>
        <div className='font-poppins'>
          {/* Header Section */}
          <div ref={textRef} className='text-center mb-16'>
            {textTrail.map((style, index) => (
              <animated.div key={index} style={style}>
                {index === 0 ? (
                  <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4'>
                    Services
                  </h1>
                ) : (
                  <p className='text-xl md:text-2xl text-gray-600 font-medium'>
                    Professional Development Solutions
                  </p>
                )}
              </animated.div>
            ))}
          </div>

          {/* Services Grid */}
          <div ref={ref} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {trail.map((style, index) => {
              const service = services[index];
              const Icon = service.icon;
              return (
                <animated.div
                  key={index}
                  style={style}
                  className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 ${service.borderColor} hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2`}
                >
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className='text-white text-2xl' />
                  </div>

                  {/* Title and tagline */}
                  <div className='mb-6'>
                    <h3 className='text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors'>
                      {service.title}
                    </h3>
                    <p className={`text-sm font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                      {service.tagline}
                    </p>
                  </div>

                  {/* Feature list */}
                  <div className='space-y-3 mb-8'>
                    {service.summaryItems.map((item, itemIndex) => (
                      <div key={itemIndex} className='flex items-start space-x-3'>
                        <FaCheck className={`text-sm mt-1 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent flex-shrink-0`} />
                        <p className='text-gray-700 text-sm leading-relaxed'>{item}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleOpenModal(service.title, service.summaryItems, service.description)}
                    className={`w-full bg-gradient-to-r ${service.gradient} text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transform hover:scale-105 transition-all duration-300 group-hover:from-opacity-90 group-hover:to-opacity-90`}
                  >
                    <span>Learn More</span>
                    <FaArrowRight className='text-sm group-hover:translate-x-1 transition-transform duration-300' />
                  </button>

                  {/* Decorative elements */}
                  <div className={`absolute top-4 right-4 w-20 h-20 bg-gradient-to-r ${service.gradient} opacity-5 rounded-full blur-xl group-hover:opacity-10 transition-opacity duration-300`}></div>
                </animated.div>
              );
            })}
          </div>

          {/* Bottom CTA Section */}
          <div className='text-center mt-16'>
            <div className='bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border-2 border-blue-100 max-w-4xl mx-auto'>
              <h3 className='text-3xl font-bold text-gray-900 mb-4'>
                Ready to Build Something Amazing?
              </h3>
              <p className='text-lg text-gray-600 mb-6'>
                Let's discuss your project and bring your vision to life with modern, scalable solutions.
              </p>
              <a 
                href="#contact"
                className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto inline-block'
              >
                <FaRocket />
                <span>Start Your Project</span>
              </a>
            </div>
          </div>

          {/* Modal */}
          {showModal && <ServicesModal onClose={() => setShowModal(false)} {...modalData} />}
        </div>
      </div>
    </div>
  );
}

export default Services;
