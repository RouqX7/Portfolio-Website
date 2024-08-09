import React, { useState } from 'react';

function ProfileCard() {
  const [imageSrc, setImageSrc] = useState('/FarouqLinkedImage.jpg'); // Initial placeholder image

  // Function to update the image source
  const handleImageUpdate = () => {
    const imagePath = '/FarouqLinkedImage.jpg'; // Replace with the actual image path
    setImageSrc(imagePath);
  };

  return (
    <div className="text-center mt-8">
      <div 
        className="w-64 h-72 mt-20  mx-auto bg-gray-200 overflow-hidden cursor-pointer"
        onMouseEnter={handleImageUpdate}
      >
        <img src={imageSrc} alt="Profile" className="w-full h-full object-cover rounded-lg" />
      </div>
    </div>
  );
}

export default ProfileCard;
