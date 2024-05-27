import React from 'react';

function DownloadCVButton() {
  return (
    <div className="text-center mt-8">
      <a href="/FarouqR_CV.pdf" download className="bg-gray-800 text-white px-6 py-3 rounded-full inline-block">
        Download CV
      </a>
    </div>
  );
}

export default DownloadCVButton;
