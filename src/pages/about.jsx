import React from 'react';
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer'; // <-- import Intersection Observer
import ProfileCard from '../components/ProfileCard';
import InfoCard from '../components/InfoCard';
import DownloadCVButton from '../components/DownloadCVButton';

const cards = [
  { icon: '💡', title: 'Experience', description: 'University and Placement' },
  { icon: '📁', title: 'Completed', description: '40+ Projects Individual and College' },
  { icon: '🎧', title: 'Support', description: 'Online 24/7' },
];

function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 }); // observe the 'About' section

  const trail = useTrail(cards.length, {
    opacity: inView ? 1 : 0, 
    x: inView ? 0 : -20,     
    config: { mass: 5, tension: 100, friction: 80 }, // Adjusted values for slower animation
  });

  return (
    <div ref={ref} className="max-w-screen-lg mx-auto p-4">
      <div className="text-3xl text-center">About me</div>
      <div className="text-sm text-center">My Introduction</div>

      <div className="flex flex-col md:flex-row items-start">
        <ProfileCard />
        <div className="flex flex-col md:ml-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {trail.map((style, index) => (
              <animated.div key={index} style={style}>
                <InfoCard
                  icon={cards[index].icon}
                  title={cards[index].title}
                  description={cards[index].description}
                />
              </animated.div>
            ))}
          </div>

          {/* The text box */}
          <div className="rounded-sm w-auto mt-8 p-4">
            <p className="text-gray-700">
              I am a Computer Systems graduate from the University of Limerick with a strong passion for developing innovative and efficient software solutions. With expertise in full-stack development, I have the skills to create dynamic and responsive websites from scratch. As a software engineer, I have successfully completed numerous projects, showcasing my ability to deliver high-quality and user-friendly applications. Let's collaborate and bring your ideas to life!
            </p>
          </div>
        </div>
      </div>

      <DownloadCVButton />
    </div>
  );
}

export default About;
