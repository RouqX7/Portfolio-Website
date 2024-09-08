import React from 'react';

function ProjectCard({ imageSrc, title, demoText,category,onClick }) {
  return (
    <div className='bg-white  rounded-lg p-4 max-w-xs border border-gray-200 cursor-pointer font-poppins shadow-md hover:shadow-lg  transition duration-300'
    onClick={onClick}
> 
      {/* Outer box with a sharper look */}
      <div className='overflow-hidden rounded-lg h-48 w-64 border border-gray-300'>
        {/* Image container with specific size and sharp corners */}
        <img 
          src={imageSrc} 
          alt={title} 
          className='h-full w-full '
        />
      </div>
      <h2 className='mt-4 text-lg font-semibold'>{title}</h2>
      <p className='text-gray-500'>{demoText}</p>
    </div>
  );
}

export default ProjectCard;
