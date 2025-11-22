import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import CVVideo from './pages/CVVideo';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/admin';


function App() {
  return (
    <div>
      <Routes>
        {/* Main Portfolio Routes */}
        <Route path="/" element={
          <>
            <NavBar />
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
            <div id="about" className="section min-h-screen">
              <About />
            </div>

            {/* Portfolio Section */}
            <div id="portfolio" className="section min-h-screen">
              <Portfolio />
            </div>

            {/* Resume Section */}
            <div id="resume" className="section min-h-screen">
              <Resume />
            </div>

            {/* Services Section */}
            <div id="services" className="section min-h-screen">
              <Services />
            </div>

            {/* Contact Section */}
            <div id="contact" className="section min-h-screen">
              <Contact />
            </div>
          </>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* CV Video Route */}
        <Route path="/cv-video" element={<CVVideo />} />

        {/* Blog Routes */}
        <Route path="/blogs" element={<><NavBar /><Blogs /></>} />
        <Route path="/blogs/:blogId" element={<><NavBar /><BlogDetail /></>} />
      </Routes>
    </div>
  );
}

export default App;
