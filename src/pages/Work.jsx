import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Navbar from "../components/Navbar";
import CustomCursor from "../components/CustomCursor";

const LOGO_URL = "https://arocksworld.com/static/fav/fav.svg?3";

const Work = () => {
  const navigate = useNavigate();
  const pageRef = useRef();
  const titleRef = useRef();
  const projectsRef = useRef([]);

  const projects = [
    {
      name: "Digital Art Installations",
      description: "Immersive experiences blending music and visual art",
      details: "Large-scale interactive installations that combine cutting-edge technology with artistic vision, creating transformative experiences for audiences worldwide."
    },
    {
      name: "Music Production",
      description: "Cutting-edge sound design and composition",
      details: "Innovative soundscapes and compositions that push the boundaries of contemporary music, featuring collaborations with renowned artists and producers."
    },
    {
      name: "Cultural Events",
      description: "Curated experiences that bridge communities",
      details: "High-profile cultural events and festivals that bring together diverse audiences, fostering connections through shared artistic experiences."
    },
    {
      name: "Brand Collaborations",
      description: "Strategic partnerships with leading cultural institutions",
      details: "Creative partnerships with global brands and institutions, developing unique campaigns that merge commercial objectives with artistic integrity."
    },
    {
      name: "Interactive Exhibitions",
      description: "Multi-sensory experiences in gallery and museum settings",
      details: "Curated exhibitions that challenge traditional gallery experiences, incorporating technology, sound, and interactive elements to engage visitors."
    },
    {
      name: "Digital Platforms",
      description: "Innovative online experiences and virtual spaces",
      details: "Development of digital platforms and virtual environments that extend the reach of artistic expression into new technological realms."
    }
  ];

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

    if (projectsRef.current.length > 0) {
      gsap.fromTo(
        projectsRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          delay: 0.4,
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
          <div className="w-full max-w-6xl mx-auto text-center">
            <h1 
              ref={titleRef}
              className="text-7xl md:text-8xl font-black uppercase tracking-wider mb-16"
              style={{ opacity: 0 }}
            >
              WORK
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {projects.map((project, index) => (
                <div
                  key={index}
                  ref={(el) => (projectsRef.current[index] = el)}
                  className="border border-white/10 p-8 hover:border-white/30 transition-all group cursor-pointer text-left"
                  style={{ opacity: 0 }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.02, duration: 0.3 });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                  }}
                >
                  <div className="mb-4">
                    <span className="text-white/40 text-sm uppercase tracking-wider">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-3 group-hover:text-white/90 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <p className="text-white/50 text-xs leading-relaxed">
                    {project.details}
                  </p>
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

export default Work;

