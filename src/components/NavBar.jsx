import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import "../App.css";

const NavBar = () => {
  const [showNav, setShowNav] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 425);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY = window.scrollY;
    };

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 425);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={`bg-navbarBg text-navbarText sticky overflow-hidde w-full top-0 z-50 transition-transform duration-300 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container  mx-auto flex items-center justify-between md:justify-start">
        <Logo />
        <div className={`ml-auto md:flex md:items-center `}>
          <NavLinks isSmallScreen={isSmallScreen} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
