import React from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
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
import Resume from './pages/Resume';
import Contact from './pages/contact';

function App() {
  return (
    <div>
      <NavBar />
      {/* Parallax Container with the correct number of pages */}
      <Parallax className='bg-gray-50' pages={6} style={{ top: '0', left: '0' }}>

        {/* Home Section */}
        <ParallaxLayer offset={0} speed={0.2}>
          <div id="home" className="section h-screen flex flex-col items-center justify-center bg-gray-50">
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
        </ParallaxLayer>

        {/* About Section */}
        <ParallaxLayer offset={1} speed={0.4}>
          <div id="about" className="section h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-screen-lg mx-auto p-4">
              <About />
            </div>
          </div>
        </ParallaxLayer>

        {/* Portfolio Section */}
        <ParallaxLayer offset={2} speed={0.6}>
          <div id="portfolio" className="section h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-screen-lg mx-auto p-4">
              <Portfolio />
            </div>
          </div>
        </ParallaxLayer>

        {/* Resume Section */}
        <ParallaxLayer offset={3} speed={0.8}>
          <div id="resume" className="section h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-screen-lg mx-auto p-4">
              <Resume />
            </div>
          </div>
        </ParallaxLayer>

        {/* Services Section */}
        <ParallaxLayer offset={4} speed={1}>
          <div id="services" className="section h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-screen-lg mx-auto p-4">
              <Services />
            </div>
          </div>
        </ParallaxLayer>

        {/* Contact Section */}
        <ParallaxLayer offset={5} speed={1.2}>
          <div id="contact" className="section h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-screen-lg mx-auto p-4">
              <Contact />
            </div>
          </div>
        </ParallaxLayer>

      </Parallax>
    </div>
  );
}

export default App;
