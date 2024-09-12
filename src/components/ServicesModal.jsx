import React from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

function ServicesModal({ title, summaryItems, description, onClose }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-4 sm:p-8'>
      {/* Responsive modal container */}
      <div className='relative bg-white rounded-lg shadow-md px-8 py-6 sm:px-10 sm:py-8 md:px-20 md:py-10 flex flex-col gap-5 items-center w-full max-w-md sm:max-w-lg md:max-w-xl'>
        {/* Close button */}
        <button 
          onClick={onClose} 
          className='absolute -top-10 right-0 text-black'
        >
          <IoCloseSharp size={30} />
        </button>
        
        {/* Title */}
        <div className='mt-6 sm:mt-10 text-center font-bold text-lg sm:text-xl'>{title}</div>
        
        {/* Render summary items with checkmarks */}
        <ul className='text-gray-600 text-left w-full'>
          {summaryItems.map((item, index) => (
            <li key={index} className='flex items-center gap-2 mb-2'>
              <FaCheckCircle className='text-green-500' />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Description */}
        <div className='text-gray-400 text-center'>{description}</div>
      </div>
    </div>
  );
}

export default ServicesModal;
