import React, { useState } from "react";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle menu open/close
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/20 shadow-lg font-poppins">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-6 py-4">
        {/* Logo or Name */}
        <a href="#home" className="flex items-center space-x-3 rtl:space-x-reverse group">
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 transform group-hover:scale-105">
            Farouq Rabiu
          </span>
        </a>

        {/* Toggle Button for mobile screens */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-700 rounded-lg md:hidden hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          {/* Icon for menu button */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            ></path>
          </svg>
        </button>

        {/* Navigation Menu */}
        <div className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-white/50 backdrop-blur-sm md:bg-transparent md:flex-row md:space-x-2 md:mt-0 md:border-0">
            <li>
              <a
                href="#home"
                className="block py-2 px-4 text-gray-700 rounded-lg hover:bg-white/50 md:hover:bg-gradient-to-r md:hover:from-blue-50 md:hover:to-purple-50 md:hover:text-blue-600 transition-all duration-300 font-medium"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="block py-2 px-4 text-gray-700 rounded-lg hover:bg-white/50 md:hover:bg-gradient-to-r md:hover:from-blue-50 md:hover:to-purple-50 md:hover:text-blue-600 transition-all duration-300 font-medium"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                className="block py-2 px-4 text-gray-700 rounded-lg hover:bg-white/50 md:hover:bg-gradient-to-r md:hover:from-blue-50 md:hover:to-purple-50 md:hover:text-blue-600 transition-all duration-300 font-medium"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="#resume"
                className="block py-2 px-4 text-gray-700 rounded-lg hover:bg-white/50 md:hover:bg-gradient-to-r md:hover:from-blue-50 md:hover:to-purple-50 md:hover:text-blue-600 transition-all duration-300 font-medium"
              >
                Resume
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="block py-2 px-4 text-gray-700 rounded-lg hover:bg-white/50 md:hover:bg-gradient-to-r md:hover:from-blue-50 md:hover:to-purple-50 md:hover:text-blue-600 transition-all duration-300 font-medium"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/cv-video"
                className="block py-2 px-4 text-gray-700 rounded-lg hover:bg-white/50 md:hover:bg-gradient-to-r md:hover:from-blue-50 md:hover:to-purple-50 md:hover:text-blue-600 transition-all duration-300 font-medium"
              >
                CV Video
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block py-2 px-4 text-gray-700 rounded-lg hover:bg-white/50 md:hover:bg-gradient-to-r md:hover:from-blue-50 md:hover:to-purple-50 md:hover:text-blue-600 transition-all duration-300 font-medium"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
