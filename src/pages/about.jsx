import React from 'react';
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import ProfileCard from '../components/ProfileCard';
import InfoCard from '../components/InfoCard';

const cards = [
  { icon: '🚀', title: 'Projects Built', description: 'Production-ready applications' },
  { icon: '🏗️', title: 'Architecture Focus', description: 'Clean & Scalable Systems' },
  { icon: '💼', title: 'Experience', description: 'Full Stack Development' },
];

const textItems = [
  'I\'m a self-driven software engineer who believes in building applications that are not just functional, but scalable, maintainable, and elegant.',
  'My journey from learning to building production-ready applications has taught me the importance of clean code, proper architecture, and continuous improvement.',
  'Many of my project repositories are private, but any that go live I actively update and showcase on this website to demonstrate real-world impact.',
  'I create websites for creatives and businesses, while also building full-stack projects for myself and collaborating with others on exciting ventures.',
];

function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  // Trail for the "About me" and "My Introduction" text
  const trailHeadings = useTrail(2, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: { mass: 1, tension: 80, friction: 26 },
    delay: 200,
  });

  const trailCards = useTrail(cards.length, {
    opacity: inView ? 1 : 0,
    x: inView ? 0 : -20,
    config: { mass: 1, tension: 80, friction: 26 },
    delay: 400,
  });

  const trailText = useTrail(textItems.length, {
    opacity: inView ? 1 : 0,
    x: inView ? 0 : -20,
    config: { mass: 1, tension: 80, friction: 26 },
    delay: 600,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12">
        <div ref={ref} className="max-w-screen-lg mx-auto p-4">
      {/* Apply trail animation to "About me" and "My Introduction" */}
      {trailHeadings.map((style, index) => (
        <animated.div key={index} style={style} className="text-center mb-12">
          {index === 0 ? (
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent font-poppins">About Me</h1>
          ) : (
            <p className="text-xl md:text-2xl font-poppins text-gray-600 mt-4">My Introduction</p>
          )}
        </animated.div>
      ))}

      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Profile Card - Left Side */}
        <div className="lg:w-1/3 w-full flex justify-center lg:sticky lg:top-8">
          <ProfileCard />
        </div>

        {/* Content - Right Side */}
        <div className="lg:w-2/3 w-full space-y-8">
          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

          {/* Introduction Text Box */}
          <div className="rounded-2xl bg-white/80 backdrop-blur-md p-4 sm:p-6 md:p-8 font-poppins shadow-xl border-2 border-white/50 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <span className="w-2 h-6 sm:h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-3 sm:mr-4"></span>
              About My Journey
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {trailText.map((style, index) => (
                <animated.p key={index} style={style} className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  {textItems[index]}
                </animated.p>
              ))}
            </div>
          </div>

          {/* What I Build Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border-2 border-blue-100/50 hover:shadow-2xl hover:border-blue-200 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <span className="text-2xl sm:text-4xl mr-3 sm:mr-4">🎯</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">What I Build</span>
              </h3>
              <ul className="space-y-3 sm:space-y-4 text-gray-700">
                <li className="flex items-start group">
                  <span className="text-blue-500 mr-3 mt-1.5 text-lg sm:text-xl group-hover:scale-125 transition-transform">✓</span>
                  <span className="text-sm sm:text-base md:text-lg">Modern websites for creatives and businesses with stunning designs</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-blue-500 mr-3 mt-1.5 text-lg sm:text-xl group-hover:scale-125 transition-transform">✓</span>
                  <span className="text-sm sm:text-base md:text-lg">Full-stack web applications with robust backend systems</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-blue-500 mr-3 mt-1.5 text-lg sm:text-xl group-hover:scale-125 transition-transform">✓</span>
                  <span className="text-sm sm:text-base md:text-lg">RESTful APIs with comprehensive validation and error handling</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-blue-500 mr-3 mt-1.5 text-lg sm:text-xl group-hover:scale-125 transition-transform">✓</span>
                  <span className="text-sm sm:text-base md:text-lg">Collaborative projects that solve real-world problems</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border-2 border-purple-100/50 hover:shadow-2xl hover:border-purple-200 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <span className="text-2xl sm:text-4xl mr-3 sm:mr-4">⚡</span>
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">My Approach</span>
              </h3>
              <ul className="space-y-3 sm:space-y-4 text-gray-700">
                <li className="flex items-start group">
                  <span className="text-purple-500 mr-3 mt-1.5 text-lg sm:text-xl group-hover:scale-125 transition-transform">✓</span>
                  <span className="text-sm sm:text-base md:text-lg">Always thinking about scalability and performance from day one</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-purple-500 mr-3 mt-1.5 text-lg sm:text-xl group-hover:scale-125 transition-transform">✓</span>
                  <span className="text-sm sm:text-base md:text-lg">Writing clean, maintainable code that other developers can easily understand</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-purple-500 mr-3 mt-1.5 text-lg sm:text-xl group-hover:scale-125 transition-transform">✓</span>
                  <span className="text-sm sm:text-base md:text-lg">Applying proven design patterns and architectural principles</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-purple-500 mr-3 mt-1.5 text-lg sm:text-xl group-hover:scale-125 transition-transform">✓</span>
                  <span className="text-sm sm:text-base md:text-lg">Never stopping the learning process - always improving and growing</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border-2 border-green-100/50 hover:shadow-2xl hover:border-green-200 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <span className="text-2xl sm:text-4xl mr-3 sm:mr-4">🛠️</span>
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Technologies I Love</span>
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {['Java Spring Boot', 'TypeScript/Express', 'PostgreSQL', 'Firebase', 'Redis', 'Docker'].map((tech, index) => (
                  <span key={index} className="px-3 sm:px-4 py-2 bg-gradient-to-r from-white to-gray-50 rounded-full text-sm sm:text-base font-semibold text-gray-800 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                    {tech}
                  </span>
                ))}
                <span className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full text-sm sm:text-base font-semibold text-gray-800 border-2 border-blue-200 hover:border-purple-300 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                  and everything that helps build better software
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}

export default About;
