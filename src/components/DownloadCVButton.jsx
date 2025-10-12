import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { ResumeService } from '../services/resumeService';
import { FaDownload } from 'react-icons/fa';

function DownloadCVButton() {
  const [cvUrl, setCvUrl] = useState('/FarouqR_CV.pdf'); // Fallback to default
  const [loading, setLoading] = useState(true);
  
  // Intersection Observer hook
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  // Spring animation for the button appearance
  const buttonAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 100, friction: 80 },
  });

  useEffect(() => {
    const fetchActiveCV = async () => {
      try {
        const activeCV = await ResumeService.getActiveCV();
        if (activeCV && activeCV.fileUrl) {
          setCvUrl(activeCV.fileUrl);
        }
      } catch (error) {
        console.error('Error fetching active CV:', error);
        // Falls back to default CV if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchActiveCV();
  }, []);

  return (
    <animated.div ref={ref} style={buttonAnimation} className="text-center mt-8">
      <a 
        href={cvUrl} 
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full inline-flex items-center gap-3 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium text-lg"
      >
        <FaDownload />
        {loading ? 'Loading CV...' : 'Download CV'}
      </a>
    </animated.div>
  );
}

export default DownloadCVButton;
