import React, { useState } from 'react';
import {  FaLongArrowAltRight } from 'react-icons/fa';
import { MdOutlineWeb } from "react-icons/md";
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer'; // Import Intersection Observer
import ServicesModal from '../components/ServicesModal';

function Services() {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: '', summary: '', description: '' });

  // Service data for trail animation
  const services = [
    { title: 'Full Stack Developer', summary: 'Build full stack web applications', description: 'I offer expertise in both frontend and backend development.' },
    { title: 'Backend Developer', summary: 'Build scalable server-side applications', description: 'I specialize in creating robust backend solutions.' },
    { title: 'Backend Developer', summary: 'Build scalable server-side applications', description: 'I specialize in creating robust backend solutions.' },
  ];

  const handleOpenModal = (title, summary, description) => {
    setModalData({ title, summary, description });
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
    config: { tension: 100, friction: 40 },
  });

  // Trail animation for service boxes
  const trail = useTrail(services.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 100, friction: 40 },
  });

  return (
    <div className='min-h-screen flex flex-col p-8 font-poppins'>
      {/* Title Section with Trail Animation */}
      <div ref={textRef}>
        {textTrail.map((style, index) => (
          <animated.div key={index} style={style} className='text-center'>
            {index === 0 ? (
              <h1 className='text-4xl font-bold text-gray-800'>Services</h1>
            ) : (
              <h2 className='text-md mt-2 text-gray-600'>What I offer</h2>
            )}
          </animated.div>
        ))}
      </div>

      {/* Container for Service Boxes */}
      <div ref={ref} className='flex-grow flex justify-center items-center'>
        <div className='flex flex-row space-x-14'>
          {trail.map((style, index) => (
            <animated.div key={index} style={style} className='bg-white h-64 w-48 rounded-md shadow-md'>
              <div className='flex flex-col p-4'>
                <MdOutlineWeb className='text-gray-500 text-3xl mt-24 ml-0' />
                <p className='mt-4 text-left text-gray-800'>{services[index].title}</p>
                <div className='flex flex-row mt-2 h-auto w-auto'>
                  <button
                    onClick={() => handleOpenModal(services[index].title, services[index].summary, services[index].description)}
                    className='text-left text-gray-500'
                  >
                    View more
                  </button>
                  <FaLongArrowAltRight className='mt-1 ml-1 text-gray-400 ' />
                </div>
              </div>
            </animated.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && <ServicesModal onClose={() => setShowModal(false)} {...modalData} />}
    </div>
  );
}

export default Services;
