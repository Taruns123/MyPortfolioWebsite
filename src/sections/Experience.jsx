import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CanvasLoader from "../components/CanvasLoader.jsx";
import { Avatar } from "../components/Avatar.jsx";
import { Office } from "../components/Office.jsx";
import { workExperiences } from "../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

const WorkExperience = () => {
  const [animation, setAnimation] = useState("Standing");
  const avatarRef = useRef(); // Reference for the avatar

  useEffect(() => {
    if (avatarRef.current) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-container",
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            // Direction of scroll is determined here:
            // self.direction > 0 indicates scrolling down
            // self.direction < 0 indicates scrolling up
            if(self.direction>0){

              if (self.progress >= 0.7) {
                // When scroll reaches near the end, switch to typing
                setAnimation("Typing");
              } else {
                // During the scroll down, use Falling animation
                setAnimation("Falling");
              }
            }
            else{
              if (self.progress >= 0.8) {
                // When scroll reaches near the end, switch to typing
                setAnimation("Typing");
              }
              else if(self.progress >= 0.1 && self.progress<0.8){
                setAnimation("Falling");
              }
               else {
                // During the scroll down, use Falling animation
                setAnimation("Standing");
              }

            }
          },
        },
      });
  

        timeline
        // Falling animation: Avatar moves downward
        .to(
          avatarRef.current.position,
          {
            x: -0.5, // Final x position
            y: -5.05, // Final y position
            z: -0.9, // Final z position
            duration: 2,
            // onStart: () => {

            //     setAnimation("Falling");
            //     // Add slight rotation and scale during the fall
                
            //     gsap.to(avatarRef.current.rotation, {
            //       x: -Math.PI / 6 + 1, // Slight tilt forward
            //       z: 0,
            //       y: -3.2,
            //       duration: 1.5,
            //     });
            //     gsap.to(avatarRef.current.scale, {
            //       x: 1.8,
            //       y: 1.8,
            //       z: 1.8,
            //       duration: 1.5,
            //     });
              
            // },
          },
          0
          );

        timeline
        // Falling animation: Avatar moves downward
        .to(
          avatarRef.current.rotation,
          {
            x: -Math.PI / 6 + 1, // Slight tilt forward
            z: 0,
            y: -3.2,
            duration: 2,
          },
          0
          );

        timeline
        // Falling animation: Avatar moves downward
        .to(
          avatarRef.current.scale,
          {
            x: 1.8,
            y: 1.8,
            z: 1.8,
            duration: 2,
          },
          0
          );
        
    }
  }, [avatarRef.current]);

  const [company, setCompany] = useState("vectorconsulting");  
  
  return (
    <section className="c-space my-20" id="work">
      <div className="w-full text-white-600">
        <p className="head-text">My Work Experience</p>

        <div className="work-container bg-black">
          <div className="work-canvas relative">
            <div className="h-[calc(100vh*2.2)] w-[calc(50vw)] absolute z-[4]">
              <Canvas>
                <ambientLight intensity={7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <directionalLight position={[10, 10, 10]} intensity={0.8} />
                <OrbitControls
                  enableRotate={false}
                  enableZoom={false}
                  maxPolarAngle={Math.PI / 2}
                />

                <Suspense fallback={<CanvasLoader />}>
                  {/* Single Avatar */}
                  <group ref={avatarRef}>
                    <Avatar
                      scale={0.7}
                      animation={animation}
                      rotation-y={0.1}
                      rotation-x={-0.8}
                      position={[-0.6,2, 0]} // Starting position (Avatar 1 position)
                      wireframe={false}
                      company={company}
                    />
                  </group>

                  <Office
                    section={0}
                    scale={1}
                    position-y={-2}
                    position-z={1}
                    position-x={1}
                    rotation-y={0.8}
                  />
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
            </div>
          </div>

          <div className="work-content">
            <div className="sm:py-10 py-5 sm:px-5 px-2.5">
              {workExperiences?.map((item, index) => (
                <div
                  key={index}
                  // onClick={() => setAnimationName(item.animation.toLowerCase())}
                  onPointerOver={() =>
                    setCompany(item.name.toLowerCase().replace(" ", ""))
                  }
                  onClick={() => setCompany(item.name.toLowerCase().replace(" ", ""))}
                  // onPointerOut={() => setAnimationName("idle")}
                  className="work-content_container group"
                >
                  <div className="flex flex-col h-full justify-start items-center py-2">
                    <div className="work-content_logo">
                      <img
                        className="w-full h-full rounded-[16px]"
                        src={item.icon}
                        alt=""
                      />
                    </div>

                    <div className="work-content_bar" />
                  </div>

                  <div className="sm:p-5 px-2.5 py-5">
                    <p className="font-bold text-white-800">{item.name}</p>
                    <p className="text-sm mb-5">
                      {item.pos} -- <span>{item.duration}</span>
                    </p>
                    <p className="group-hover:text-white text-sm transition-all ease-in-out duration-500">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
