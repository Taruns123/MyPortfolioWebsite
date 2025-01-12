import { useState, useRef, useEffect } from "react";
import Globe from "react-globe.gl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../components/Button.jsx";
import Lenis from "@studio-freight/lenis";
import Skills from "../components/Skills.jsx";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const introRef = useRef(null); // Ref for the intro section
  const secondLinkRef = useRef(null); // Ref for the second link section
  const globeRef = useRef(null); // Ref for the globe section
  const techStackRef = useRef(null);
  const contactRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText("tarunshetty190702@gmail.com");
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4, // Adjust the duration for smooth scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Customize easing
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Animation for the intro section
    gsap.fromTo(
      introRef.current,
      { x: -500, opacity: 0, scale: 1.2 },
      {
        x: 0,
        scale: 1,
        opacity: 0.97,
        // backdropFilter: "blur(5px)",
        duration: 3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 80%",
          end: "bottom 5%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Animation for the second link section (Tech Stack)
    gsap.fromTo(
      secondLinkRef.current,
      { x: -500, opacity: 0, scale: 1.2 },
      {
        x: 0,
        scale: 1,
        opacity: 0.97,
        duration: 2.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: secondLinkRef.current,
          start: "top 80%",
          end: "bottom 5%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Animation for the globe section
    gsap.fromTo(
      globeRef.current,
      { x: 500, opacity: 0 },
      {
        x: 0,
        opacity: 0.97,
        duration: 3.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: globeRef.current,
          start: "top 80%",
          end: "bottom 2%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    gsap.fromTo(
      techStackRef.current,
      { x: -500, opacity: 0 },
      {
        x: 0,
        opacity: 0.97,
        duration: 3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: techStackRef.current,
          start: "top 80%",
          end: "bottom 2%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    gsap.fromTo(
      contactRef.current,
      { x: 500, opacity: 0 },
      {
        x: 0,
        opacity: 0.97,
        duration: 3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          end: "bottom 2%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Clean up Lenis on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <section className="c-space my-20 overflow-hidden" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div
          className="col-span-1 xl:row-span-3 intro rounded-lg shadow-lg"
        >
          <div   ref={introRef} className="grid-container p-5 ">
            <img
              src="assets/grid1.png"
              alt="grid-1"
              className="w-full sm:h-[276px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">Hi, I’m Tarun Shetty</p>
              <p className="grid-subtext">
                With 4 years of experience, I have honed my skills in both
                frontend and backend dev, creating dynamic and responsive
                websites.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div ref={secondLinkRef} className="grid-container">
           <Skills/>

            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I specialize in a variety of languages, frameworks, and tools
                that allow me to build robust and scalable applications
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div ref={globeRef} className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center hover:cursor-pointer">
              <Globe
                height={390}
                width={390}
                animateIn={true}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelAltitude={0.04}
                labelSize={2}
                labelDotRadius={0.8}
                labelsData={[
                  {
                    lat: 19.07,
                    lng: 72.88,
                    text: "I'm from Mumbai, India",
                    size: 15,
                  },
                ]}
              />
            </div>
            <div>
              <p className="grid-headtext">
                I’m very flexible with time zone communications & locations
              </p>
              <p className="grid-subtext">
                I&apos;m based in Mumbai, India and open to remote work
                worldwide.
              </p>
              <a href="#contact">
      <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
    </a>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div ref={techStackRef} className="grid-container">
            <img
              src="assets/grid3.png"
              alt="grid-3"
              className="w-full sm:h-[266px] h-fit object-contain"
            />

            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving problems and building things through code.
                Programming isn&apos;t just my profession—it&apos;s my passion.
                I enjoy exploring new technologies, and enhancing my skills.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div ref={contactRef} className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <div className="copy-container" onClick={handleCopy}>
                <img
                  src={hasCopied ? "assets/tick.svg" : "assets/copy.svg"}
                  alt="copy"
                />
                <p className="lg:text-xl md:text-lg font-medium text-gray_gradient text-white">
                  tarunshetty190702@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
