import React from 'react';

function ContactCard({ icon: Icon, title, info, buttonText }) {
  return (
    <div className='bg-white h-32 w-64 rounded-md shadow-md flex flex-col justify-center items-center p-4'>
      <div className="text-3xl text-gray-500">
        <Icon />
      </div>
      <p className="mt-4 font-semibold text-gray-800">{title}</p>
      <p className="text-gray-500">{info}</p>
      <button className="mt-2 text-gray-500 hover:text-gray-700 flex items-center">
        {buttonText} <span className="ml-1">→</span>
      </button>
    </div>
  );
}

export default ContactCard;
