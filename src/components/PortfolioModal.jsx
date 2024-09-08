import React, { useState } from 'react';
import { FaLocationArrow, FaGithub, FaArrowLeft } from "react-icons/fa";

function PortfolioModal({ isOpen, onClose, project }) {
  const [videoMode, setVideoMode] = useState(false); // State to track if we're in video mode

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal content */}
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-4xl sm:w-full flex flex-col h-auto relative z-50">
        
        {/* Check if we're in video mode */}
        {!videoMode ? (
          <>
            {/* Half-and-Half Layout */}
            <div className="flex flex-1">
              {/* Left Side - Project Details */}
              <div className="p-6 flex-1 font-poppins">
                <h2 className="text-4xl font-bold text-black mb-2 ">{project.title}</h2>
                <p className="text-gray-400 mb-4">
                  {project.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                </p>
                <p className="text-green-400 mb-4">
                  {project.technologies || "Html 5, Css 3, Javascript"}
                </p>
                <div className="flex space-x-4 mt-6">
                  {/* Green circle button to switch to video mode */}
                  <button
                    className="flex items-center justify-center bg-green-500 hover:bg-green-400 transition duration-300 text-white rounded-full p-3"
                    onClick={() => setVideoMode(true)} // Set video mode to true when clicked
                  >
                    <FaLocationArrow />
                  </button>

                  {/* GitHub Link */}
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 transition duration-300 text-white rounded-full p-3">
                    <FaGithub />
                  </a>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="flex-1">
                <img src={project.imageSrc} alt={project.title} className="w-full h-full " />
              </div>
            </div>
          </>
        ) : (
          // Full-Screen Video Mode
          <div className="relative w-full h-full">
            {/* Video taking up full screen */}
            <video controls className="w-full h-full object-cover">
              <source src={project.liveLink} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Back Arrow to go back to the image view */}
            <button
              onClick={() => setVideoMode(false)} // Set video mode to false when clicked
              className="absolute top-4 left-4 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full"
            >
              <FaArrowLeft />
            </button>
          </div>
        )}
      </div>

      {/* Close button for modal */}
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
