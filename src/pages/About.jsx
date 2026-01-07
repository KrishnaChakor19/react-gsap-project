import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Navbar from "../components/Navbar";
import CustomCursor from "../components/CustomCursor";

const LOGO_URL = "https://arocksworld.com/static/fav/fav.svg?3";

const About = () => {
  const navigate = useNavigate();
  const pageRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();
  const detailsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
      );
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.4 }
      );
    }

    if (detailsRef.current.length > 0) {
      gsap.fromTo(
        detailsRef.current,
        { x: -30, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          delay: 0.6,
          ease: "power2.out" 
        }
      );
    }
  }, []);

  return (
    <>
      <CustomCursor />
      <div ref={pageRef} className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black opacity-50" />
        
        <Navbar bgLoaded={true} logoUrl={LOGO_URL} showContent={true} />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center px-8 py-24">
          <div className="w-full max-w-5xl mx-auto text-center">
            <h1 
              ref={titleRef}
              className="text-7xl md:text-8xl font-black uppercase tracking-wider mb-12"
              style={{ opacity: 0 }}
            >
              ABOUT
            </h1>

            <div ref={contentRef} className="mb-16 flex flex-col items-center" style={{ opacity: 0 }}>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 max-w-3xl text-center">
                AROCK is a creator and curator at the intersection of music, technology, and culture. 
                Based in New York and Los Angeles, AROCK has been a pioneering force in shaping the 
                digital landscape of contemporary art and entertainment.
              </p>
              
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-3xl text-center">
                With a unique vision that bridges the gap between traditional artistic expression and 
                cutting-edge digital innovation, AROCK has established a reputation as a thought leader 
                in the creative industry. The work spans multiple disciplines, creating immersive 
                experiences that challenge conventional boundaries.
              </p>

              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl text-center">
                Through strategic collaborations with leading cultural institutions, brands, and artists, 
                AROCK continues to push the envelope, exploring new ways to connect audiences with 
                transformative creative experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
              {[
                { title: "Music & Tech Pioneer", description: "Leading innovation in digital music production and technology integration" },
                { title: "Cultural Curator", description: "Shaping contemporary culture through carefully selected artistic experiences" },
                { title: "Creative Director", description: "Overseeing visionary projects that merge art, music, and technology" },
                { title: "Digital Innovator", description: "Pioneering new forms of digital expression and interactive experiences" }
              ].map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (detailsRef.current[index] = el)}
                  className="border border-white/10 p-6 hover:border-white/30 transition-colors text-left"
                  style={{ opacity: 0 }}
                >
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <button
                onClick={() => navigate("/")}
                className="text-white/80 hover:text-white text-sm uppercase tracking-wider border border-white/20 px-8 py-3 hover:border-white/40 transition-all"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

