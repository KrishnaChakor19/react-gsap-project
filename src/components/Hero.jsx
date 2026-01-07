import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = ({ bgLoaded, showContent }) => {
  const titleRef = useRef();
  const pulseRef = useRef();
  const registeredRef = useRef();

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.set(titleRef.current, {
      opacity: 0,
      scale: 0.98,
      letterSpacing: "-0.02em",
      transformOrigin: "center center"
    });

    if (bgLoaded && showContent) {
      const tl = gsap.timeline();

      tl.to(titleRef.current, {
        opacity: 1,
        scale: 1,
        letterSpacing: "0.06em",
        duration: 1.2,
        ease: "power2.out",
        delay: 0.5,
      });

      if (!registeredRef.current) {
        registeredRef.current = true;
        pulseRef.current = gsap.to(titleRef.current, {
          scale: 1.02,
          duration: 2.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.5,
        });
      }
    }

    return () => {
      if (pulseRef.current) {
        pulseRef.current.kill();
      }
    };
  }, [bgLoaded, showContent]);

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <h1
        ref={titleRef}
        className="font-black uppercase text-[18vw] text-white leading-none hero-text glow z-10 pointer-events-none whitespace-nowrap"
        style={{
          lineHeight: 0.85,
          margin: 0,
          padding: 0,
          textAlign: 'center'
        }}
      >
        AROCK
        <span className="text-[3.5vw] ml-[0.3vw]">®</span>
      </h1>
    </div>
  );
};

export default Hero;
