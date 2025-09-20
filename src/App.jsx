import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import AdminDashboard from './pages/admin';


function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <>
            {/* Home Section */}
            <div id="home" className="section  min-h-screen pt-16 flex flex-col items-center justify-center bg-gray-50">
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

            {/* About Section */}
            <div id="about" className="section  min-h-screen pt-16 flex items-center justify-center bg-gray-50">
              <div className="max-w-screen-lg mx-auto p-4">
                <About />
              </div>
            </div>

            {/* Portfolio Section */}
            <div id="portfolio" className="section  min-h-screen pt-16 flex items-center justify-center bg-gray-50">
              <div className="max-w-screen-lg mx-auto p-4">
                <Portfolio />
              </div>
            </div>

            {/* Resume Section */}
            <div id="resume" className="section  min-h-screen pt-16 flex items-center justify-center bg-gray-50">
              <div className="max-w-screen-lg mx-auto p-4">
                <Resume />
              </div>
            </div>

            {/* Services Section */}
            <div id="services" className="section  min-h-screen pt-16 flex items-center justify-center bg-gray-50">
              <div className="max-w-screen-lg mx-auto p-4">
                <Services />
              </div>
            </div>

            {/* Contact Section */}
            <div id="contact" className="section  min-h-screen pt-16 flex items-center justify-center bg-gray-50">
              <div className="max-w-screen-lg mx-auto p-4">
                <Contact />
              </div>
            </div>
          </>
        } />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
