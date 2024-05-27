import React, { useState } from 'react';

function ProfileCard() {
  const [imageSrc, setImageSrc] = useState('path_to_placeholder_image'); // Initial placeholder image

  // Function to update the image source
  const handleImageUpdate = () => {
    const imagePath = 'path_to_actual_image'; // Replace with the actual image path
    setImageSrc(imagePath);
  };

  return (
    <div className="text-center mt-8">
      <div 
        className="w-40 h-40 mx-auto bg-gray-200 overflow-hidden cursor-pointer"
        onMouseEnter={handleImageUpdate}
      >
        <img src={imageSrc} alt="Profile" className="w-full h-full object-cover" />
      </div>
      {/* <p className="text-gray-700 mt-4">
        I am a Computer Systems graduate from the University of Limerick with a strong passion for developing innovative and efficient software solutions. With expertise in full-stack development, I have the skills to create dynamic and responsive websites from scratch. As a software engineer, I have successfully completed numerous projects, showcasing my ability to deliver high-quality and user-friendly applications. Let's collaborate and bring your ideas to life!
      </p> */}
    </div>
  );
}

export default ProfileCard;
