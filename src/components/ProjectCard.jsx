import React from 'react';

function ProjectCard({ imageSrc, title, demoText, category, featured, onClick }) {
  return (
    <div 
      className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer font-poppins transform hover:scale-105'
      onClick={onClick}
    > 
      {/* Image container with overlay */}
      <div className='relative overflow-hidden h-48'>
        <img 
          src={imageSrc} 
          alt={title} 
          className='h-full w-full object-cover transition-transform duration-300 hover:scale-110'
        />
        
        {/* Category badge */}
        <div className='absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm'>
          {category}
        </div>
        
        {/* Featured badge */}
        {featured && (
          <div className='absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg'>
            ⭐ Featured
          </div>
        )}
        
        {/* Hover overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end'>
          <div className='p-4 text-white'>
            <p className='text-sm font-medium'>{demoText}</p>
          </div>
        </div>
      </div>
      
      {/* Content section */}
      <div className='p-5'>
        <h2 className='text-xl font-bold text-gray-800 mb-2 line-clamp-1'>{title}</h2>
        
        {/* Action button */}
        <div className='flex items-center justify-between mt-4'>
          <span className='text-sm text-gray-500 font-medium'>Click to view details</span>
          <div className='text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline transition-colors'>
            {demoText}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
