import React, { useState } from "react";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle menu open/close
  };

  return (
    <nav className="bg-white sticky top-0 z-50 border-gray-200 font-poppins">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo or Name */}
        <a href="#home" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-2xl font-bold text-gray-900">Farouq</span>
        </a>

        {/* Toggle Button for mobile screens */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <a
                href="#home"
                className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-900 md:p-0"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-900 md:p-0"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-900 md:p-0"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="#resume"
                className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-900 md:p-0"
              >
                Resume
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-900 md:p-0"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-900 md:p-0"
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
