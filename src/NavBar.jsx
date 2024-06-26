import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">Farouq</span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-900 md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-900 md:p-0"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/skills"
                className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-900 md:p-0"
              >
                Skills
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-900 md:p-0"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-900 md:p-0"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-900 md:p-0"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
