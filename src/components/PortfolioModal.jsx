import React, { useState } from 'react';
import { FaLocationArrow, FaGithub, FaArrowLeft, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

function PortfolioModal({ isOpen, onClose, project }) {
  const [videoMode, setVideoMode] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      {/* Modal content */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all sm:max-w-5xl w-full flex flex-col h-auto relative z-50 max-h-[90vh]">
        
        {/* Check if we're in video mode */}
        {!videoMode ? (
          <>
            {/* Responsive Layout */}
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Project Details */}
              <div className="p-8 flex-1 font-poppins">
                <div className="mb-6">
                  <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                    {project.category}
                  </span>
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                    {project.title}
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {project.description || "Project description coming soon."}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Technologies</h3>
                    <p className="text-blue-600 font-medium">
                      {project.technologies || "Technologies to be announced."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                  {/* Live Demo Button */}
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </a>

                  {/* GitHub Link */}
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <FaGithub />
                    View Code
                  </a>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="flex-1 relative">
                <img
                  src={project.imageSrc}
                  alt={project.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                
                {/* Image overlay with project info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-200">{project.category} Project</p>
                  </div>
                </div>
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
              onClick={() => setVideoMode(false)}
              className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
            >
              <FaArrowLeft />
            </button>
          </div>
        )}
      </div>

      {/* Close button for modal */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
      >
        <FaTimes />
      </button>
    </div>
  );
}

export default PortfolioModal;
