import React from 'react';
import { FaLocationArrow } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


function PortfolioModal({ isOpen, onClose, project }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg h-96 overflow-hidden shadow-xl transform transition-all sm:max-w-4xl sm:w-full flex">
        <div className="p-6 flex-1">
          <h2 className="text-4xl font-bold text-black mb-2">{project.title}</h2>
          <p className="text-gray-400 mb-4">
            {project.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et."}
          </p>
          <p className="text-green-400 mb-4">
            {project.technologies || "Html 5, Css 3, Javascript"}
          </p>
          <div className="flex space-x-4 mt-6">
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-green-500 hover:bg-green-400 transition duration-300 text-white rounded-full p-3">
            <div class="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-6xl text-white font-semibold">Live Demo</div>
            <i className="fas fa-external-link-alt"></i>
              <FaLocationArrow />
            </a>
            
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 transition duration-300 text-white rounded-full p-3">
              <i className="fab fa-github"></i>
              <FaGithub />
            </a>
          </div>
        </div>
        <div className="flex-1">
          <img src={project.imageSrc} alt={project.title} className="w-full h-full " />
        </div>
      </div>
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-white text-2xl"
      >
        &times;
      </button>
    </div>
  );
}

export default PortfolioModal;
