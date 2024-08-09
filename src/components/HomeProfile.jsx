import React, { useState } from 'react';

function HomeProfile() {
  const [imageSrc, setImageSrc] = useState('/FarouqLinkedImage.jpg'); // Initial placeholder image

  // Function to update the image source
  const handleImageUpdate = () => {
    const imagePath = '/FarouqLinkedImage.jpg'; // Replace with the actual image path
    setImageSrc(imagePath);
  };

  return (
    <div className="text-center md:text-left mt-8 flex flex-col items-center md:items-start">
      <div 
        className="w-40 h-40 mx-auto md:mx-0 bg-gray-200 overflow-hidden cursor-pointer rounded-full"
        onMouseEnter={handleImageUpdate}
      >
        <img src={imageSrc} alt="Profile" className="w-full h-full object-cover" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mt-4">Farouq Rabiu <span className="wave">👋</span></h1>
      <h2 className="text-xl text-gray-500 mt-2">Computer Systems Graduate</h2>
      <p className="text-gray-700 mt-4 px-8 md:px-0">
        I'm a Software Engineer  based in Waterford, and I'm very passionate and dedicated to my work.
      </p>
      <button className="mt-4 px-6 py-2 bg-black text-white rounded-md">Say Hello</button>
    </div>
  );
}

export default HomeProfile;
