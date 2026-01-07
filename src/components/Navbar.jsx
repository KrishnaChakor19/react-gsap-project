import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Menu from "./Nav/Menu";

const Navbar = ({ bgLoaded, logoUrl, showContent }) => {
  const navigate = useNavigate();
  const loaderRef = useRef();
  const barRef = useRef();
  const navbarRef = useRef();
  const logoRef = useRef();
  const menuButtonRef = useRef();
  const pulseTl = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    pulseTl.current = gsap.timeline({ repeat: -1 });
    pulseTl.current
      .to(barRef.current, { width: "60%", duration: 0.8, ease: "power2.inOut" })
      .to(barRef.current, { width: "10%", duration: 0.6, ease: "power2.inOut" });

    return () => pulseTl.current && pulseTl.current.kill();
  }, []);

  useEffect(() => {
    if (bgLoaded) {
      pulseTl.current && pulseTl.current.kill();
      gsap.to(barRef.current, { width: "100%", duration: 0.5, ease: "power2.out" });
      gsap.to(loaderRef.current, { height: 0, opacity: 0, duration: 0.6, delay: 0.6, pointerEvents: "none" });
    }
  }, [bgLoaded]);

  useEffect(() => {
    if (showContent) {
      gsap.fromTo(
        navbarRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );
      
      gsap.fromTo(
        logoRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.4 }
      );

      gsap.fromTo(
        menuButtonRef.current,
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.4 }
      );
    }
  }, [showContent]);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div ref={navbarRef} className="absolute top-0 left-0 w-full px-8 py-5 flex justify-between items-center z-20 text-white">
        <div ref={logoRef} className="flex items-center gap-4">
          <img 
            src={logoUrl || "https://arocksworld.com/static/fav/fav.svg?3"} 
            alt="AROCK" 
            className="navbar-logo cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
            style={{ 
              height: '2rem',
              width: 'auto',
              display: 'block'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div ref={loaderRef} className="overflow-hidden mt-2 h-1 w-36 bg-gray-700 rounded">
            <div ref={barRef} className="h-full bg-white w-0"></div>
          </div>
        </div>

        <div 
          ref={menuButtonRef}
          onClick={handleMenuClick}
          className="text-xs tracking-widest navbar-menu cursor-pointer hover:opacity-70 transition-opacity select-none"
        >
          MENU
        </div>
      </div>
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navbar;
