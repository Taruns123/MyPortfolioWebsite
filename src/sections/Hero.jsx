import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import HackerRoom from "../components/HackerRoom";
import CanvasLoader from "../components/CanvasLoader";
// import { Leva, useControls } from "leva";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants";
import Target from "../components/Target";
import ReactLogo from "../components/ReactLogo";
import Rings from "../components/Rings";
import Cube from "../components/Cube";
import HeroCamera from "../components/HeroCamera";
import Button from "../components/Button";
import Robot from "../components/Robot";
import Model from "../components/Donut";

const Hero = () => {
  //   const x = useControls("HackerRoom", {
  //     positionX: { value: 2, min: -10, max: 10 },
  //     positionY: { value: 2.5, min: -10, max: 10 },
  //     positionZ: { value: 2.5, min: -10, max: 10 },
  //     rotationX: { value: 0, min: -10, max: 10 },
  //     rotationY: { value: 0, min: -10, max: 10 },
  //     rotationZ: { value: 0, min: -10, max: 10 },
  //     scale: { value: 1, min: 0.1, max: 10 },
  //   });

  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);
  return (
    <section className="min-h-screen flex flex-col relative" id="home">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="hero_tag text-gray_gradient">
          Building Products and Brands
        </p>
      </div>
      <div className="w-full h-full absolute inset-0 ">
        {/* <Leva /> */}
        <Canvas className="w-full h-full pl-100 opacity-85">
          <Suspense fallback={<CanvasLoader />} />
          <PerspectiveCamera makeDefault position={[0, 0, 20]} />
          <HeroCamera isMobile={isMobile}>
            {/* <HackerRoom
              scale={sizes.deskScale}
              position={sizes.deskPosition}
              rotation={[0, -Math.PI, 0]}
            /> */}
            <Model />
            {/* <Robot
              scale={sizes.deskScale * 30}
              position={sizes.deskPosition}
              rotation={[0, -0.7, 0]}
            /> */}
          </HeroCamera>
          {/* <group> */}
          {/* <Target position={sizes.targetPosition} />
            <ReactLogo position={sizes.reactLogoPosition} />
            <Cube position={sizes.cubePosition} />
            <Rings position={sizes.ringPosition} /> */}
          {/* </group> */}
          <Environment preset="city" />
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} />
        </Canvas>
      </div>
      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        {/* <a href="#about" className="w-fit">
          <Button
            name="Let's work together"
            isBeam
            containerClass="sm:w-fit w-full sm:min-w-[96px]"
          />
        </a> */}
      </div>
    </section>
  );
};

export default Hero;
