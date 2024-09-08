import React, { useState } from 'react';
import { useSpring, animated, useTrail } from 'react-spring';

function HomeProfile() {
  const [imageSrc, setImageSrc] = useState('/FarouqLinkedImage.jpg'); // Initial image
  const [hovered, setHovered] = useState(false); // State to detect hover

  // Function to update the image source
  const handleImageUpdate = () => {
    const imagePath = '/FarouqLinkedImage.jpg'; // Replace with the actual image path
    setImageSrc(imagePath);
  };

  // Define the content to animate using useTrail
  const items = [
    <h1 className="text-4xl font-bold text-gray-800 mt-4">Farouq Rabiu <span className="wave">👋</span></h1>,
    <h2 className="text-xl text-gray-500 mt-2">Computer Systems Graduate</h2>,
    <p className="text-gray-700 mt-4 px-8 md:px-0">
      I'm a Software Engineer based in Waterford, and I'm very passionate and dedicated to my work.
    </p>,
    <button className="mt-4 px-6 py-2 bg-black text-white rounded-md">Say Hello</button>,
  ];

  const trail = useTrail(items.length, {
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    delay: 200,
    config: { tension: 100, friction: 40 },
  });

  // Hover animation for the profile image using useSpring
  const imageProps = useSpring({
    transform: hovered ? 'scale(1.1)' : 'scale(1)',
    config: { tension: 300, friction: 15 },
  });

  return (
    <div className="text-center md:text-left mt-8 flex flex-col items-center md:items-start">
      {/* Profile Image with Hover Effect */}
      <animated.div
        style={imageProps}
        className="w-40 h-40 mx-auto md:mx-0 bg-gray-200 overflow-hidden cursor-pointer rounded-full"
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
