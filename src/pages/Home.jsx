import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PlayButton from "../components/PlayButton";
import MetaInfo from "../components/MetaInfo";
import LoadParent from "../components/Loading/LoadParent";
import CustomCursor from "../components/CustomCursor";
import "../App.css";

const BG_URL = "https://images.prismic.io/arock-website-2023/d4147892-cb03-4582-af32-326bb109803f_AROCK-_1502.jpg?fm=webp&q=100&fit=crop";
const LOGO_URL = "https://arocksworld.com/static/fav/fav.svg?3";

const Home = () => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const bgRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    const img = new Image();
    img.src = BG_URL;
    img.onload = () => {
      setBgLoaded(true);
    };
  }, []);

  useEffect(() => {
    if (loadingComplete && bgLoaded) {
      const revealTimeline = gsap.timeline();
      
      revealTimeline.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" }
      );

      revealTimeline.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out", onComplete: () => setShowContent(true) },
        "-=0.5"
      );
    }
  }, [loadingComplete, bgLoaded]);

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
  };

  return (
    <>
      {!loadingComplete && <LoadParent onComplete={handleLoadingComplete} />}
      <CustomCursor />
      
      <div className="w-screen h-screen relative overflow-hidden bg-black">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${BG_URL})`,
            opacity: 0,
          }}
        />

        <div className="absolute inset-0 bg-black/40" />

        <div ref={contentRef} className="relative z-10 w-full h-full" style={{ opacity: 0 }}>
          <Navbar bgLoaded={bgLoaded} logoUrl={LOGO_URL} showContent={showContent} />
          <Hero bgLoaded={bgLoaded} showContent={showContent} />
          <PlayButton showContent={showContent} />
          <MetaInfo showContent={showContent} />
        </div>
      </div>
    </>
  );
};

export default Home;

