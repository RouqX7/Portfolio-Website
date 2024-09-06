import React from 'react';

function EducationCard({ year, title, institution,description }) {
    return (
        <div className='text-lg '>

       
        <div className=' p-4 rounded-lg shadow-md mb-4 h-32'>

            <h2 className='text-lg font-bold text-gray-900'>{year}</h2>
            <h3 className='text-md font-semibold text-black'>{title}</h3>
            <p className='text-sm text-black'>{institution}</p>
        </div> 
        </div>
    );
}

export default EducationCard;
