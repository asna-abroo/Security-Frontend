import React, { useState } from "react";
import '../css/NavBar.css'

const NavLinks = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling to section
    }
    setIsOpen(false); // Close the menu after clicking a link
  };

  return (
    <div className="relative flex items-center justify-center ml-auto">
      {/* Toggle Button */}
      <div className="z-50 flex justify-end">
        <button
          className="text-navbarText focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      <ul
        className={`fixed top-0 left-0 right-0 bg-[#27322d] p-4 space-y-4 text-sm z-40 transform transition-transform duration-300 ${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        } origin-top`}
      >
        <li className="text-center">
          <button
            onClick={() => handleScrollToSection("hero-section")}
            className="hover:text-white text-white"
          >
            Home
          </button>
        </li>
        <li className="text-center">
          <button
            onClick={() => handleScrollToSection("about-page")}
            className="hover:text-white text-white"
          >
            About
          </button>
        </li>
        <li className="text-center">
          <button
            onClick={() => handleScrollToSection("services")}
            className="hover:text-white text-white"
          >
            Services
          </button>
        </li>
        <li className="text-center">
          <button
            onClick={() => handleScrollToSection("live-stats")}
            className="hover:text-white text-white"
          >
            Live Stats
          </button>
        </li>
        <li className="text-center">
          <button
            onClick={() => handleScrollToSection("contact-form")}
            className="hover:text-white text-white"
          >
            Get Your Security Score Report
          </button>
        </li>
        <li className="text-center">
          <button
            onClick={() => handleScrollToSection("security-score-page")}
            className="hover:text-white text-white"
          >
            Security Score
          </button>
        </li>
        <li className="text-center">
          <button
            onClick={() => handleScrollToSection("organisation-individual-choice")}
            className="hover:text-white text-[#B1FF8F] font-bold"
          >
            Categories
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavLinks;
