import React from 'react';
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import ProfileCard from '../components/ProfileCard';
import InfoCard from '../components/InfoCard';
import DownloadCVButton from '../components/DownloadCVButton';

const cards = [
  { icon: '💡', title: 'Experience', description: 'University and Placement' },
  { icon: '📁', title: 'Completed', description: '40+ Projects Individual and College' },
  { icon: '🎧', title: 'Support', description: 'Online 24/7' },
];

const textItems = [
  'I am a Computer Systems graduate from the University of Limerick with a strong passion for developing innovative and efficient software solutions.',
  'With expertise in full-stack development, I have the skills to create dynamic and responsive websites from scratch.',
  'As a software engineer, I have successfully completed numerous projects, showcasing my ability to deliver high-quality and user-friendly applications.',
  "Let's collaborate and bring your ideas to life!",
];

function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  // Trail for the "About me" and "My Introduction" text
  const trailHeadings = useTrail(2, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: { mass: 5, tension: 100, friction: 80 },
  });

  const trailCards = useTrail(cards.length, {
    opacity: inView ? 1 : 0,
    x: inView ? 0 : -20,
    config: { mass: 5, tension: 100, friction: 80 },
  });

  const trailText = useTrail(textItems.length, {
    opacity: inView ? 1 : 0,
    x: inView ? 0 : -20,
    config: { mass: 5, tension: 100, friction: 80 },
  });

  return (
    <div ref={ref} className="max-w-screen-lg mx-auto p-4">
      {/* Apply trail animation to "About me" and "My Introduction" */}
      {trailHeadings.map((style, index) => (
        <animated.div key={index} style={style} className="text-center">
          {index === 0 ? (
            <div className="text-3xl">About me</div>
          ) : (
            <div className="text-sm">My Introduction</div>
          )}
        </animated.div>
      ))}

      <div className="flex flex-col md:flex-row items-start mt-8">
        <ProfileCard />
        <div className="flex flex-col md:ml-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {trailCards.map((style, index) => (
              <animated.div key={index} style={style}>
                <InfoCard
                  icon={cards[index].icon}
                  title={cards[index].title}
                  description={cards[index].description}
                />
              </animated.div>
            ))}
          </div>

          {/* The text box with trail animation */}
          <div className="rounded-sm w-auto mt-8 p-4">
            {trailText.map((style, index) => (
              <animated.p key={index} style={style} className="text-gray-700 mt-2">
                {textItems[index]}
              </animated.p>
            ))}
          </div>
        </div>
      </div>

      <DownloadCVButton />
    </div>
  );
}

export default About;
