import React from 'react';

function InfoCard({ icon, title, description }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center font-poppins">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-500">{description}</p>

    </div>

    
  );
}

export default InfoCard;
