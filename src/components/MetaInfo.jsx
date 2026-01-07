import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MetaInfo = ({ showContent }) => {
  const containerRef = useRef();
  const itemsRef = useRef([]);

  useEffect(() => {
    if (showContent) {
      gsap.fromTo(
        containerRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 1 }
      );

      gsap.fromTo(
        itemsRef.current,
        { y: 10, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          delay: 1.2,
          ease: "power2.out" 
        }
      );
    }
  }, [showContent]);

  return (
    <div 
      ref={containerRef}
      className="absolute right-10 bottom-20 text-white text-xs text-right tracking-widest"
      style={{ opacity: 0 }}
    >
      <p ref={(el) => (itemsRef.current[0] = el)} style={{ opacity: 0 }}>CREATOR</p>
      <p ref={(el) => (itemsRef.current[1] = el)} style={{ opacity: 0 }}>CURATOR</p>
      <br />
      <p ref={(el) => (itemsRef.current[2] = el)} style={{ opacity: 0 }}>NEW YORK</p>
      <p ref={(el) => (itemsRef.current[3] = el)} style={{ opacity: 0 }}>LOS ANGELES</p>
    </div>
  );
};

export default MetaInfo;
