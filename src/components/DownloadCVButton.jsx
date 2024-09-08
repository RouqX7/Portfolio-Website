import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer'; // <-- import Intersection Observer

function DownloadCVButton() {
  // Intersection Observer hook
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  // Spring animation for the button appearance
  const buttonAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 100, friction: 80 },
  });

  return (
    <animated.div ref={ref} style={buttonAnimation} className="text-center mt-8">
      <a href="/FarouqR_CV.pdf" download className="bg-gray-800 text-white px-6 py-3 rounded-full inline-block hover:bg-gray-700">
        Download CV
      </a>
    </animated.div>
  );
}

export default DownloadCVButton;
