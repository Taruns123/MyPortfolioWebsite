import React, { useRef, useState } from "react";
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export default function Model() {
  const { nodes } = useGLTF("/models/torrus.glb");
  const { viewport } = useThree();
  const torus = useRef(null);

  const [direction, setDirection] = useState({ x: 1, y: 1 }); // Movement direction
  const speed = 0.0015; // Speed of movement
  const bounds = { x: 0.8, y: 0.2 }; // Bounding box limits

  useFrame(() => {
    if (!torus.current) return;

    // Update position
    torus.current.position.x += direction.x * speed;
    torus.current.position.y += direction.y * speed;

    // Check for collisions and reverse direction if needed
    if (
      torus.current.position.x > bounds.x ||
      torus.current.position.x < -bounds.x
    ) {
      setDirection((prev) => ({ ...prev, x: -prev.x }));
    }
    if (
      torus.current.position.y > bounds.y ||
      torus.current.position.y < -bounds.y
    ) {
      setDirection((prev) => ({ ...prev, y: -prev.y }));
    }

    // Add rotation for dynamic effect
    torus.current.rotation.x += 0.02;
    torus.current.rotation.y += 0.02;
  });

  const materialProps = {
    thickness: 0.2,
    roughness: 0,
    transmission: 1,
    ior: 1.2,
    chromaticAberration: 0.02,
    backside: true,
  };

  return (
    <group scale={viewport.width / 3.75}>
      <Text
        font={"/fonts/PPNeueMontreal-Bold.otf"}
        position={[0, 0, -1]}
        fontSize={0.5}
        fontWeight={800}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Tarun Shetty
      </Text>
      <mesh ref={torus} geometry={nodes.Torus002.geometry} position={[0, 0, 0]}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}
