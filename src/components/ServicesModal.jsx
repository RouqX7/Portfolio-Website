import React from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

function ServicesModal({ title, summaryItems, description, onClose }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className='relative bg-white rounded-lg shadow-md px-20 py-10 flex flex-col gap-5 items-center w-96'>
        {/* Close button */}
        <button 
          onClick={onClose} 
          className='absolute -top-10 right-0 text-black'
        >
          <IoCloseSharp size={30} />
        </button>
        
        <div className='mt-10 text-center font-bold'>{title}</div>
        
        {/* Render summary items with checkmarks */}
        <ul className='text-gray-600 text-left'>
          {summaryItems.map((item, index) => (
            <li key={index} className='flex items-center gap-2 mb-2'>
              <FaCheckCircle className='text-green-500' />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className='text-gray-400'>{description}</div>
      </div>
    </div>
  );
}

export default ServicesModal;
