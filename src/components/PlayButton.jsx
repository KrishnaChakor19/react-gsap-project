import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const PlayButton = ({ showContent }) => {
  const buttonRef = useRef();
  const textRef = useRef();
  const iconRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (showContent) {
      gsap.fromTo(
        buttonRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.8 }
      );
    }
  }, [showContent]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(buttonRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(iconRef.current, {
      x: 3,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(iconRef.current, {
      x: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleClick = () => {
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  return (
    <div 
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute left-10 bottom-16 z-10 flex items-center gap-3 text-white cursor-pointer play-btn-group"
      style={{ opacity: 0 }}
    >
      <div className="play-btn w-12 h-12 rounded-full border-2 border-white flex items-center justify-center glow relative overflow-hidden">
        <span ref={iconRef} className="icon text-sm ml-1">▶</span>
        {isHovered && (
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
        )}
      </div>
      <p ref={textRef} className="text-xs tracking-widest leading-tight">
        PLAY<br />THE FILM
      </p>
    </div>
  );
};

export default PlayButton;
