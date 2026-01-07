import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef();
  const cursorDotRef = useRef();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia('(pointer: fine)').matches && window.innerWidth > 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    if (!isDesktop) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(cursorDot, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    const handleMouseEnter = (e) => {
      if (cursor) cursor.classList.add('hover');
    };

    const handleMouseLeave = (e) => {
      if (cursor) cursor.classList.remove('hover');
    };

    window.addEventListener('mousemove', moveCursor);
    
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.matches('a, button, .play-btn, .navbar-menu, .play-btn-group, [role="button"]')) {
        handleMouseEnter(e);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (target.matches('a, button, .play-btn, .navbar-menu, .play-btn-group, [role="button"]')) {
        handleMouseLeave(e);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('resize', checkDesktop);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorDotRef} className="custom-cursor-dot" />
    </>
  );
};

export default CustomCursor;

