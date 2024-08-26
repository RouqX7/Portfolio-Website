import React from 'react';
import NavBar from './NavBar';
import ProfileCard from './components/ProfileCard';
import InfoCard from './components/InfoCard';
import DownloadCVButton from './components/DownloadCVButton';
import SocialIcons from './components/SocialIcons';
import ScrollDownIndicator from './components/ScrollDownIndicator';
import HomeProfile from './components/HomeProfile';
import About from './pages/about';
import Services from './pages/Services';
import Skills from './pages/skills';
import Portfolio from './pages/portfolio';

function App() {
  return (
    <div>
      <NavBar />
      <div id="home" className="section h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:order-2 md:ml-8">
            <HomeProfile />
          </div>
          <div className="md:order-1 md:mr-8">
            <SocialIcons />
          </div>
        </div>
        <ScrollDownIndicator />
      </div>
      <div id="about" className="section h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-screen-lg mx-auto p-4">
        <div className="md:order-2 md:ml-8">
            <About/>
          </div>
        </div>
      </div>
      <div id="skills" className="section h-screen flex items-center justify-center">
      <div className="max-w-screen-lg mx-auto p-4">
        <div className="md:order-2 md:ml-8">
        <Skills/>
          </div>
        </div>
      </div>
      <div id="services" className="section h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-screen-lg mx-auto p-4">
        <div className="md:order-2 md:ml-8">
        <Services/>
          </div>
        </div>
      </div>
      <div id="portfolio" className="section h-screen flex items-center justify-center">
      <div className="md:order-2 md:ml-8">
        <Portfolio/>
          </div>
      </div>
      <div id="contact" className="section h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-4xl">Contact Section</h1>
      </div>
    </div>
  );
}

export default App;
