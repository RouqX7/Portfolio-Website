// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NavBar from "./NavBar";
// import About from "./pages/about";
// import Skills from "./pages/skills";
// import Services from "./pages/Services";
// import Portfolio from "./pages/portfolio";
// import Contact from "./pages/contact";
// import Home from "./pages/Home";

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <NavBar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/skills" element={<Skills />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/portfolio" element={<Portfolio />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import DownloadCVButton from './components/DownloadCVButton';
import NavBar from './NavBar';

function App() {
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <ul className="flex justify-center space-x-4 p-4">
         <NavBar/>
        </ul>
      </nav>

      <div id="home" className="section h-screen flex items-center justify-center">
        <h1 className="text-4xl">Home Section</h1>
      </div>
      <div id="about" className="section h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-4xl">About Section</h1>
      </div>
      <div id="projects" className="section h-screen flex items-center justify-center">
        <h1 className="text-4xl">Projects Section</h1>
      </div>
      <div id="contact" className="section h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-4xl">Contact Section</h1>
        <DownloadCVButton />
      </div>
    </div>
  );
}

export default App;
