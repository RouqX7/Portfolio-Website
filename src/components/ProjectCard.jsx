import React from 'react';

function ProjectCard({ imageSrc, title, demoText }) {
  return (
    <div className='bg-white shadow-lg rounded-lg p-4 max-w-xs border border-gray-200'> 
      {/* Outer box with a sharper look */}
      <div className='overflow-hidden rounded-lg h-48 w-64 border border-gray-300'>
        {/* Image container with specific size and sharp corners */}
        <img 
          src={imageSrc} 
          alt={title} 
          className='h-full w-full object-cover'
        />
      </div>
      <h2 className='mt-4 text-lg font-semibold'>{title}</h2>
      <p className='text-gray-500'>{demoText}</p>
    </div>
  );
}

export default ProjectCard;
