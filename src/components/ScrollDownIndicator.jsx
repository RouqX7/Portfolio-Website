import React from 'react';
import { useTrail, animated } from 'react-spring';

function ScrollDownIndicator() {
  const items = [
    <p key="text">Scroll down</p>,
    <span key="arrow" className="block mt-2 animate-bounce">↓</span>,
  ];

  const trail = useTrail(items.length, {
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: {mass: 5, tension: 100, friction: 80 },
  });

  return (
    <div className="text-center mt-8 text-gray-500">
      {trail.map((style, index) => (
        <animated.div key={index} style={style}>
          {items[index]}
        </animated.div>
      ))}
    </div>
  );
}

export default ScrollDownIndicator;
