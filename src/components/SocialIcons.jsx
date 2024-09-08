import React from 'react';
import { FaInstagram, FaDribbble, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTrail, animated } from 'react-spring';

function SocialIcons() {
  // Define the list of social media icons
  const icons = [
    { icon: <FaInstagram size={24} />, link: 'https://instagram.com' },
    { icon: <FaLinkedin size={24} />, link: 'https://www.linkedin.com/in/farouq-rabiu-1522802aa/' },
    { icon: <FaDribbble size={24} />, link: 'https://dribbble.com' },
    { icon: <FaGithub size={24} />, link: 'https://github.com/RouqX7' },
  ];

  // Create a trail animation for the icons
  const trail = useTrail(icons.length, {
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: {mass: 5, tension: 100, friction: 80 },
  });

  return (
    <div className="flex flex-col space-y-4 text-gray-500 mt-4">
      {trail.map((style, index) => (
        <animated.a
          key={index}
          href={icons[index].link}
          style={style}
          className="hover:text-gray-800"
        >
          {icons[index].icon}
        </animated.a>
      ))}
    </div>
  );
}

export default SocialIcons;
