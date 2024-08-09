import React from 'react';
import { FaInstagram, FaDribbble, FaGithub } from 'react-icons/fa';

function SocialIcons() {
  return (
    <div className="flex flex-col space-y-4 text-gray-500 mt-4">
      <a href="https://instagram.com" className="hover:text-gray-800">
        <FaInstagram size={24} />
      </a>
      <a href="https://dribbble.com" className="hover:text-gray-800">
        <FaDribbble size={24} />
      </a>
      <a href="https://github.com" className="hover:text-gray-800">
        <FaGithub size={24} />
      </a>
    </div>
  );
}

export default SocialIcons;
