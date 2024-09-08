import React, { useState } from 'react';
import { useTrail, animated, useSpring } from 'react-spring';
import { useInView } from 'react-intersection-observer'; // Import Intersection Observer

function ProfileCard() {
  const [imageSrc, setImageSrc] = useState('/FarouqLinkedImage.jpg');
  const [hovered, setHovered] = useState(false);

  // Intersection Observer to trigger animations only when in view
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  // UseSpring for hover effect
  const imageHoverProps = useSpring({
    transform: hovered ? 'scale(1.05)' : 'scale(1)',
    config: { tension: 200, friction: 15 },
  });

  // Define trail items (you can add more elements later if needed)
  const trailItems = [
    <animated.div key="image" className="w-64 h-72 mx-auto bg-gray-200 overflow-hidden cursor-pointer">
      <animated.img
        src={imageSrc}
        alt="Profile"
        className="w-full h-full object-cover rounded-lg"
        style={imageHoverProps} // Apply hover animation
      />
    </animated.div>,
  ];

  // Apply trail animation only when the component is in view
  const trail = useTrail(trailItems.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 100, friction: 80 },
  });

  return (
    <div ref={ref} className="text-center mt-8">
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
