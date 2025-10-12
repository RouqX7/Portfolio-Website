import React, { useState } from 'react';
import { useSpring, animated, useTrail } from 'react-spring';

function HomeProfile() {
  const [imageSrc, setImageSrc] = useState('/gradphoto.jpg');
  const [hovered, setHovered] = useState(false);

  // Define the content to animate using useTrail
  const items = [
    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
      Farouq Rabiu <span className="wave">👋</span>
    </h1>,
    <h2 className="text-2xl md:text-3xl text-gray-600 font-medium">
      Full Stack Software Engineer
    </h2>,
    <div className="text-lg md:text-xl text-gray-700 max-w-2xl">
      <p className="mb-4">
        <strong className="text-gray-900">Passionate Software Engineer with a Focus on Clean Architecture & System Design</strong>
      </p>
      <p className="mb-4">
        I'm a self-driven software engineer who believes in building applications that are not just functional, but scalable, maintainable, and elegant.
      </p>
      <p>
        My journey from learning to building production-ready applications has taught me the importance of clean code, proper architecture, and continuous improvement.
      </p>
    </div>,
    <div className="flex flex-wrap gap-4 mt-6">
      <a 
        href="#contact"
        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
      >
        Say Hello
      </a>
      <a 
        href="#portfolio"
        className="px-8 py-3 bg-white text-gray-700 rounded-full font-medium border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md inline-block"
      >
        View Portfolio
      </a>
    </div>,
  ];

  const trail = useTrail(items.length, {
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(30px)' },
    delay: 200,
    config: { mass: 1, tension: 80, friction: 26 },
  });

  // Hover animation for the profile image using useSpring
  const imageProps = useSpring({
    transform: hovered ? 'scale(1.05)' : 'scale(1)',
    config: { mass: 1, tension: 80, friction: 26 },
  });

  return (
    <div className="text-center md:text-left mt-8 flex flex-col items-center md:items-start font-poppins">
      {/* Profile Image with Hover Effect */}
      <animated.div
        style={imageProps}
        className="w-48 h-48 md:w-56 md:h-56 mx-auto md:mx-0 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden cursor-pointer rounded-full shadow-2xl border-4 border-white"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={imageSrc} alt="Profile" className="w-full h-full object-cover" />
      </animated.div>

      {/* Animated Text and Button using useTrail */}
      {trail.map((style, index) => (
        <animated.div key={index} style={style}>
          {items[index]}
        </animated.div>
      ))}
    </div>
  );
}

export default HomeProfile;
