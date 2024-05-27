import React from 'react';
import ProfileCard from '../components/ProfileCard';
import InfoCard from '../components/InfoCard';
import DownloadCVButton from '../components/DownloadCVButton';

function About() {
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <ProfileCard />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <InfoCard icon="💡" title="Experience" description="University and Placement" />
        <InfoCard icon="📁" title="Completed" description="40+ Projects Individual and College" />
        <InfoCard icon="🎧" title="Support" description="Online 24/7" />
      </div>
      <p className="text-gray-700 mt-4">
        I am a Computer Systems graduate from the University of Limerick with a strong passion for developing innovative and efficient software solutions. With expertise in full-stack development, I have the skills to create dynamic and responsive websites from scratch. As a software engineer, I have successfully completed numerous projects, showcasing my ability to deliver high-quality and user-friendly applications. Let's collaborate and bring your ideas to life!
      </p>
      <DownloadCVButton />
    </div>
  );
}

export default About;
