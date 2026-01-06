import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const App = () => {
  const boxRef = useRef();
  const circleRef = useRef();
  const tl = gsap.timeline();

  useGSAP(() => {
    tl.to(boxRef.current, {
      x: 1000,
      rotation: 360,
      duration: 2,
      delay: 2,
      borderRadius: "50%",
    });
  }, []);

 

  useGSAP(() => {
    tl.to(circleRef.current, {
      x: 1000,
      rotation: 360,
      duration: 2,
      borderRadius: "10px",
    });
  }, []);

  return (
    <div className="h-screen w-screen flex gap-10 flex-col bg-black p-10">
      <div
        ref={boxRef}
        className="box h-50 w-50 rounded-md bg-gradient-to-r from-red-500 to-blue-500"
      ></div>
      <div
        ref={circleRef}
        className="circle rounded-[50%] h-50 w-50  bg-gradient-to-r from-blue-500 to-red-500"
      ></div>
    </div>
  );
};

export default App;
