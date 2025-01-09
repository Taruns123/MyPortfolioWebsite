import React, { useEffect, useRef, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import WorkExperience from "./sections/Experience";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
import Lenis from "@studio-freight/lenis";
import { LoadingScreen } from "./components/LoadingScreen";

const App = () => {
  const svgRef = useRef(null);
  const ball01Ref = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 3, // Adjust the duration for smooth scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Customize easing
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    const pathLength = lineRef.current.getTotalLength();

    // Set initial dash properties
    gsap.set(lineRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const main = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        scrub: true,
        start: "top center",
        end: "bottom center",
      },
    });

    // Animate the path draw
    main.to(lineRef.current, { strokeDashoffset: 0, duration: 1 }, 0).to(
      ball01Ref.current,
      {
        motionPath: {
          path: lineRef.current,
          align: lineRef.current,
          alignOrigin: [0.5, 0.5],
        },
        duration: 1,
      },
      0
    );
    return () => {
      lenis.destroy();
    };
  }, []);

  const [started, setStarted] = useState(false);

  return (
    <main className="max-w-7xl mx-auto">
      <svg
        className="absolute top-0 left-0 right-0 z-[-10]  "
        id="svg"
        height={"550vh"}
        width={"100vw"}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 220 3200" // Increased viewBox height
        ref={svgRef}
      >
        <path
          className="theLine"
          d="M -200,-10 
          Q 450 230 300 450 
          T 130 750 
          Q 100 1000 750 750 
          Q 700 650 300 1000
          Q 150 1150  370 1190
          Q 600 1200  450 1160 
          Q 350 1150  400 1300  
          T 500 1500
          Q 600 1600 800 1590
          Q 1150 1550 900 1500
          Q  500  1500 350 1800
          T -10 2300
   
          "
          fill="none"
          stroke="#0039a6"
          strokeWidth="25px"
          ref={lineRef}
          strokeLinecap="round"
        />
      </svg>
      <LoadingScreen started={started} setStarted={setStarted} />
      {started && <Navbar />}
      <Hero />
      <About />
      <Projects />
      <WorkExperience />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;
