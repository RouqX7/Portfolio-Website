import React from 'react';

function ExperienceCard({ year, title, description }) {
    return (
        <div className=' p-4 rounded-lg shadow-md mb-4'>
            <h2 className='text-lg font-bold font-poppins text-gray-900'>{year}</h2>
            <h3 className='text-md text-black font-semibold font-poppins'>{title}</h3>
            <p className='text-sm text-black font-poppins'>{description}</p>
        </div>
    );
}

export default ExperienceCard;
