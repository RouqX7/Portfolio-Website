import React, { useState } from 'react';
import { useTrail, animated, useSpring } from 'react-spring';

function ProfileCard() {
  const [imageSrc, setImageSrc] = useState('/FarouqLinkedImage.jpg'); 
  const [hovered, setHovered] = useState(false); 

  
  

  const trailItems = [
    <div key="image" className="w-64 h-72 mx-auto bg-gray-200 overflow-hidden cursor-pointer">
      <animated.img
        src={imageSrc}
        alt="Profile"
        className="w-full h-full object-cover rounded-lg"
        style={hovered ? { transform: 'scale(1.05)' } : { transform: 'scale(1)' }}
      />
    </div>,
  ];

  const trail = useTrail(trailItems.length, {
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 100, friction: 50 },
  });

  // Hover animation for scaling image
  const imageHoverProps = useSpring({
    transform: hovered ? 'scale(1.05)' : 'scale(1)',
    config: { tension: 200, friction: 15 },
  });

  return (
    <div className="text-center mt-8">
      {trail.map((style, index) => (
        <animated.div
          key={index}
          style={style}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {trailItems[index]}
        </animated.div>
      ))}
    </div>
  );
}

export default ProfileCard;
