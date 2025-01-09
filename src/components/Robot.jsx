import React, { useRef } from "react";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function Robot(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/robot.glb");
  const { actions } = useAnimations(animations, group);

  const monitortxt = useTexture("textures/desk/monitor.png");
  const screenTxt = useTexture("textures/desk/screen.png");
  const tarunTxt = useTexture("textures/desk/tarunF.png");
  tarunTxt.offset.setX(0.08);
  tarunTxt.offset.setY(-0.37);
  //   tarunTxt.repeat.set(2, 2);
  useGSAP(() => {
    gsap.to(group.current.position, {
      y: group.current.position.y + 1.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
    });
  });

  const [isVisible, setIsVisible] = React.useState(false);

  setTimeout(() => {
    setIsVisible((vis) => !vis);
  }, 3000);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="e6bc6bb73ecd467bb2f0e5f0d02ee26cfbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Cylinder008"
                  position={[208.806, 292.812, 7.143]}
                  rotation={[-2.429, 0.964, 0.958]}
                  scale={1.047}
                >
                  <mesh
                    name="Cylinder008_RedPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder008_RedPlastic_0.geometry}
                    material={materials.RedPlastic}
                  />
                  <mesh
                    name="Cylinder008_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder008_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                </group>
                <group
                  name="Cylinder012"
                  position={[211.731, 272.127, -32.5]}
                  rotation={[0.827, 1.5, -1.634]}
                  scale={1.047}
                >
                  <mesh
                    name="Cylinder012_RedPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder012_RedPlastic_0.geometry}
                    material={materials.RedPlastic}
                  />
                  <mesh
                    name="Cylinder012_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder012_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                </group>
                <group
                  name="Cylinder013"
                  position={[44.078, 133.123, 99.943]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={1.047}
                >
                  <mesh
                    name="Cylinder013_RedPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder013_RedPlastic_0.geometry}
                    material={materials.RedPlastic}
                  />
                  <mesh
                    name="Cylinder013_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder013_Metal_0.geometry}
                    material={materials.Metal}
                  />
                </group>
                <group
                  name="B��zierCurve"
                  position={[83.462, 268.294, -121.63]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="B��zierCurve_Wires_0"
                    castShadow
                    receiveShadow
                    geometry={nodes["B��zierCurve_Wires_0"].geometry}
                    material={materials.Wires}
                  />
                </group>
                <group
                  name="Cylinder014"
                  position={[83.462, 268.978, -117.956]}
                  scale={3.247}
                >
                  <mesh
                    name="Cylinder014_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder014_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                  <mesh
                    name="Cylinder014_Darkness_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder014_Darkness_0.geometry}
                    material={materials.Darkness}
                  />
                </group>
                <group
                  name="Cylinder019"
                  position={[108.473, 214.346, -94.415]}
                  rotation={[0, 0, Math.PI / 2]}
                  scale={-1.881}
                >
                  <mesh
                    name="Cylinder019_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder019_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                </group>
                <group
                  name="B��zierCurve001"
                  position={[93.702, 268.294, -121.63]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="B��zierCurve001_Wires_0"
                    castShadow
                    receiveShadow
                    geometry={nodes["B��zierCurve001_Wires_0"].geometry}
                    material={materials.Wires}
                  />
                </group>
                <group
                  name="Cylinder024"
                  position={[121.256, 255.795, -115.251]}
                  scale={10.492}
                >
                  <mesh
                    name="Cylinder024_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder024_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                  <mesh
                    name="Cylinder024_Darkness_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder024_Darkness_0.geometry}
                    material={materials.Darkness}
                  />
                </group>
                <group
                  name="Cube016"
                  position={[121.256, 255.795, -115.251]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="Cube016_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube016_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                </group>
                <group
                  name="Cube017"
                  position={[121.256, 261.724, -115.251]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="Cube017_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube017_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                </group>
                <group
                  name="Cube018"
                  position={[121.256, 250.11, -115.251]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="Cube018_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube018_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                </group>
                <group
                  name="Cylinder025"
                  position={[121.256, 150.752, -69.968]}
                  scale={10.492}
                >
                  <mesh
                    name="Cylinder025_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder025_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                  <mesh
                    name="Cylinder025_Darkness_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder025_Darkness_0.geometry}
                    material={materials.Darkness}
                  />
                </group>
                <group
                  name="Cube019"
                  position={[121.256, 150.752, -69.968]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="Cube019_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube019_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                </group>
                <group
                  name="Cube020"
                  position={[121.256, 156.682, -69.968]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="Cube020_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube020_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                </group>
                <group
                  name="Cube021"
                  position={[121.256, 145.067, -69.968]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="Cube021_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube021_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                </group>
                <group
                  name="Cube023"
                  position={[168.972, 264.409, -116.749]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="Cube023_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube023_Metal_0.geometry}
                    material={materials.Metal}
                  />
                </group>
                <group
                  name="Cylinder027"
                  position={[169.072, 263.198, -118.091]}
                  rotation={[0, 0, Math.PI / 2]}
                  scale={-1.248}
                >
                  <mesh
                    name="Cylinder027_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder027_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                </group>
                <group
                  name="Cube022"
                  position={[53.937, 262.468, -117.282]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="Cube022_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube022_Metal_0.geometry}
                    material={materials.Metal}
                  />
                </group>
                <group
                  name="Cylinder030"
                  position={[65.816, 295.595, -120.323]}
                  rotation={[0, 0, Math.PI / 2]}
                  scale={-1.248}
                >
                  <mesh
                    name="Cylinder030_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder030_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                </group>
                <group
                  name="Cylinder015"
                  position={[42.087, 295.595, -120.323]}
                  rotation={[0, 0, Math.PI / 2]}
                  scale={-1.248}
                >
                  <mesh
                    name="Cylinder015_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder015_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                </group>
                <group
                  name="Cylinder016"
                  position={[65.816, 229.415, -120.323]}
                  rotation={[0, 0, Math.PI / 2]}
                  scale={-1.248}
                >
                  <mesh
                    name="Cylinder016_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder016_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                </group>
                <group
                  name="Cylinder017"
                  position={[42.087, 229.415, -120.323]}
                  rotation={[0, 0, Math.PI / 2]}
                  scale={-1.248}
                >
                  <mesh
                    name="Cylinder017_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder017_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                </group>
                <group
                  name="Cube"
                  position={[108.586, 219.759, 0.816]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="Cube_ComputerPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube_ComputerPlastic_0.geometry}
                    material={materials.ComputerPlastic}
                  />
                  <mesh
                    name="Cube_Darkness_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube_Darkness_0.geometry}
                    material={materials.Darkness}
                  />
                  <mesh
                    name="Cube_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube_Metal_0.geometry}
                    material={materials.Metal}
                  />
                </group>
                <group
                  name="Cube001"
                  position={[108.586, 90.202, 4.079]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={109.114}
                >
                  <mesh
                    name="Cube001_BodyPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube001_BodyPlastic_0.geometry}
                    material={materials.BodyPlastic}
                  />
                  <mesh
                    name="Cube001_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube001_Metal_0.geometry}
                    material={materials.Metal}
                  />
                </group>
                <group
                  name="Cube002"
                  position={[144.063, 50.008, 4.079]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={17.507}
                >
                  <mesh
                    name="Cube002_ArmPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube002_ArmPlastic_0.geometry}
                    material={materials.ArmPlastic}
                  />
                </group>
                <group
                  name="Cube004"
                  position={[108.586, 223.081, 97.829]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={112.204}
                >
                  <mesh
                    name="Cube004_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube004_Metal_0.geometry}
                    material={materials.Metal}
                  />
                </group>
                <group
                  name="Cube005"
                  position={[108.586, 223.898, 56.718]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={111.18}
                >
                  <mesh
                    name="Cube005_ScreenGlass_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube005_ScreenGlass_0.geometry}
                    material={materials.ScreenGlass}
                  >
                    {isVisible && (
                      <meshMatcapMaterial
                        opacity={0}
                        blendColor={0x000000}
                        map={tarunTxt}
                      />
                    )}
                  </mesh>
                </group>
                <group
                  name="Cube006"
                  position={[108.586, 223.081, 53.095]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={112.204}
                >
                  <mesh
                    name="Cube006_ComputerFace_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube006_ComputerFace_0.geometry}
                    material={materials.ComputerFace}
                  />
                </group>
                <group
                  name="Cube008"
                  position={[143.983, -14.335, 23.182]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="Cube008_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube008_Metal_0.geometry}
                    material={materials.Metal}
                  />
                  <mesh
                    name="Cube008_ArmPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube008_ArmPlastic_0.geometry}
                    material={materials.ArmPlastic}
                  />
                  <mesh
                    name="Cube008_YellowPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube008_YellowPlastic_0.geometry}
                    material={materials.YellowPlastic}
                  />
                </group>
                <group
                  name="Cylinder"
                  position={[108.586, 106.952, 4.079]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[67.426, 61.543, 16.012]}
                >
                  <mesh
                    name="Cylinder_SmoothPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_SmoothPlastic_0.geometry}
                    material={materials.SmoothPlastic}
                  />
                </group>
                <group
                  name="Cylinder001"
                  position={[31.01, 300.273, 94.631]}
                  scale={8.179}
                >
                  <mesh
                    name="Cylinder001_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder001_Metal_0.geometry}
                    material={materials.Metal}
                  />
                </group>
                <group
                  name="Cylinder002"
                  position={[169.42, 348.211, -43.281]}
                  rotation={[-Math.PI / 2, 0, 2.447]}
                  scale={[16.656, 16.656, 28.27]}
                >
                  <mesh
                    name="Cylinder002_CaffeeCup_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder002_CaffeeCup_0.geometry}
                    material={materials.CaffeeCup}
                  />
                </group>
                <group
                  name="Cylinder003"
                  position={[180.345, 396.17, -50.333]}
                  rotation={[-1.77, 0.284, 1.126]}
                  scale={[1.377, 1.377, 24.388]}
                >
                  <mesh
                    name="Cylinder003_PlasticStraw_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder003_PlasticStraw_0.geometry}
                    material={materials.PlasticStraw}
                  />
                </group>
                <group
                  name="Cylinder004"
                  position={[143.972, 34.686, 4.229]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="Cylinder004_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder004_Metal_0.geometry}
                    material={materials.Metal}
                  />
                  <mesh
                    name="Cylinder004_BodyPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder004_BodyPlastic_0.geometry}
                    material={materials.BodyPlastic}
                  />
                </group>
                <group
                  name="Cylinder005"
                  position={[143.983, -14.335, 4.094]}
                  rotation={[-Math.PI / 2, 1.571, 0]}
                  scale={[11.662, 11.662, 8.962]}
                >
                  <mesh
                    name="Cylinder005_ArmPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder005_ArmPlastic_0.geometry}
                    material={materials.ArmPlastic}
                  />
                  <mesh
                    name="Cylinder005_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder005_Metal_0.geometry}
                    material={materials.Metal}
                  />
                </group>
                <group
                  name="Cylinder007"
                  position={[72.413, -14.335, 4.094]}
                  rotation={[-Math.PI / 2, 1.571, 0]}
                  scale={[11.662, 11.662, 8.962]}
                >
                  <mesh
                    name="Cylinder007_ArmPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder007_ArmPlastic_0.geometry}
                    material={materials.ArmPlastic}
                  />
                  <mesh
                    name="Cylinder007_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder007_Metal_0.geometry}
                    material={materials.Metal}
                  />
                </group>
                <group
                  name="Cylinder009"
                  position={[143.983, -14.335, 82.172]}
                  rotation={[0, 0, 3.136]}
                  scale={100}
                >
                  <mesh
                    name="Cylinder009_ArmPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder009_ArmPlastic_0.geometry}
                    material={materials.ArmPlastic}
                  />
                  <mesh
                    name="Cylinder009_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder009_Metal_0.geometry}
                    material={materials.Metal}
                  />
                  <mesh
                    name="Cylinder009_RedPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder009_RedPlastic_0.geometry}
                    material={materials.RedPlastic}
                  />
                </group>
                <group
                  name="Cylinder010"
                  position={[85.149, -175.128, -137.488]}
                  rotation={[Math.PI / 2, 0.421, 0]}
                  scale={100}
                >
                  <mesh
                    name="Cylinder010_BlueConnector_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder010_BlueConnector_0.geometry}
                    material={materials.BlueConnector}
                  />
                  <mesh
                    name="Cylinder010_BrightMetal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder010_BrightMetal_0.geometry}
                    material={materials.BrightMetal}
                  />
                </group>
                <group
                  name="Plane"
                  position={[46.563, 300.22, 95.957]}
                  scale={100}
                >
                  <mesh
                    name="Plane_RedGlass_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane_RedGlass_0.geometry}
                    material={materials.RedGlass}
                  />
                  <mesh
                    name="Plane_Material_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane_Material_0.geometry}
                    material={materials.Material}
                  />
                </group>
                <group
                  name="Plane001"
                  position={[44.854, 119.555, 105.566]}
                  rotation={[-0.161, 0.021, 0]}
                  scale={17.245}
                >
                  <mesh
                    name="Plane001_PinkPaper_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane001_PinkPaper_0.geometry}
                    material={materials.PinkPaper}
                  />
                </group>
                <group
                  name="Plane002"
                  position={[214.045, 240.56, -35.883]}
                  rotation={[-1.343, 1.469, 1.541]}
                  scale={33.427}
                >
                  <mesh
                    name="Plane002_YellowPapers_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane002_YellowPapers_0.geometry}
                    material={materials.YellowPapers}
                  />
                </group>
                <group
                  name="Plane003"
                  position={[210.273, 251.021, -7.925]}
                  rotation={[-0.032, 1.548, -0.435]}
                  scale={33.427}
                >
                  <mesh
                    name="Plane003_YellowPapers_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane003_YellowPapers_0.geometry}
                    material={materials.YellowPapers}
                  />
                </group>
                <group
                  name="Plane004"
                  position={[52.718, 326.1, 15.064]}
                  rotation={[-Math.PI / 2, 0, 0.125]}
                  scale={100}
                >
                  <mesh
                    name="Plane004_Papers_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane004_Papers_0.geometry}
                    material={materials.Papers}
                  />
                  <mesh
                    name="Plane004_OrangeFolder_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane004_OrangeFolder_0.geometry}
                    material={materials.OrangeFolder}
                  />
                </group>
                <group
                  name="Plane005"
                  position={[52.718, 334.104, 23.787]}
                  rotation={[-Math.PI / 2, 0, 0.036]}
                  scale={[100, 100, 56.145]}
                >
                  <mesh
                    name="Plane005_Papers_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane005_Papers_0.geometry}
                    material={materials.Papers}
                  />
                  <mesh
                    name="Plane005_YellowFolder_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane005_YellowFolder_0.geometry}
                    material={materials.YellowFolder}
                  />
                </group>
                <group
                  name="Plane006"
                  position={[52.718, 338.042, 16.436]}
                  rotation={[-Math.PI / 2, 0, 0.329]}
                  scale={[100, 100, 56.145]}
                >
                  <mesh
                    name="Plane006_Papers_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane006_Papers_0.geometry}
                    material={materials.Papers}
                  />
                </group>
                <group
                  name="Plane027"
                  position={[45.806, 318.485, 11.083]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="Plane027_Papers_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane027_Papers_0.geometry}
                    material={materials.Papers}
                  />
                  <mesh
                    name="Plane027_OrangeFolder_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane027_OrangeFolder_0.geometry}
                    material={materials.OrangeFolder}
                  />
                </group>
                <group
                  name="Sphere"
                  position={[31.059, 300.207, 95.136]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={-7.703}
                >
                  <mesh
                    name="Sphere_DrakGlass_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere_DrakGlass_0.geometry}
                    material={materials.DrakGlass}
                  />
                </group>
                <group
                  name="Cube013"
                  position={[143.97, -13.952, 95.954]}
                  rotation={[1.593, -1.249, -3.11]}
                  scale={100}
                >
                  <mesh
                    name="Cube013_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube013_Metal_0.geometry}
                    material={materials.Metal}
                  />
                  <mesh
                    name="Cube013_SmoothPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube013_SmoothPlastic_0.geometry}
                    material={materials.SmoothPlastic}
                  />
                </group>
                <group
                  name="Cylinder011"
                  position={[72.486, 34.685, 4.229]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="Cylinder011_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder011_Metal_0.geometry}
                    material={materials.Metal}
                  />
                  <mesh
                    name="Cylinder011_BodyPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder011_BodyPlastic_0.geometry}
                    material={materials.BodyPlastic}
                  />
                </group>
                <group
                  name="Cube007"
                  position={[143.97, -13.952, 95.954]}
                  rotation={[-1.577, 0.198, 0.001]}
                  scale={100}
                >
                  <mesh
                    name="Cube007_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube007_Metal_0.geometry}
                    material={materials.Metal}
                  />
                  <mesh
                    name="Cube007_SmoothPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube007_SmoothPlastic_0.geometry}
                    material={materials.SmoothPlastic}
                  />
                </group>
                <group
                  name="Cube010"
                  position={[143.97, -13.952, 95.954]}
                  rotation={[1.563, 0.198, 0.011]}
                  scale={-100}
                >
                  <mesh
                    name="Cube010_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube010_Metal_0.geometry}
                    material={materials.Metal}
                  />
                  <mesh
                    name="Cube010_SmoothPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube010_SmoothPlastic_0.geometry}
                    material={materials.SmoothPlastic}
                  />
                </group>
                <group
                  name="Cylinder006"
                  position={[72.124, -14.336, 82.172]}
                  rotation={[0, 0, 3.136]}
                  scale={100}
                >
                  <mesh
                    name="Cylinder006_ArmPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder006_ArmPlastic_0.geometry}
                    material={materials.ArmPlastic}
                  />
                  <mesh
                    name="Cylinder006_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder006_Metal_0.geometry}
                    material={materials.Metal}
                  />
                  <mesh
                    name="Cylinder006_RedPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder006_RedPlastic_0.geometry}
                    material={materials.RedPlastic}
                  />
                </group>
                <group
                  name="Cube003"
                  position={[72.693, 50.008, 4.079]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={17.507}
                >
                  <mesh
                    name="Cube003_ArmPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube003_ArmPlastic_0.geometry}
                    material={materials.ArmPlastic}
                  />
                </group>
                <group
                  name="Cube015"
                  position={[72.17, -14.336, 23.182]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="Cube015_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_Metal_0.geometry}
                    material={materials.Metal}
                  />
                  <mesh
                    name="Cube015_ArmPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_ArmPlastic_0.geometry}
                    material={materials.ArmPlastic}
                  />
                  <mesh
                    name="Cube015_YellowPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_YellowPlastic_0.geometry}
                    material={materials.YellowPlastic}
                  />
                </group>
                <group
                  name="Cube011"
                  position={[71.845, -13.952, 95.954]}
                  rotation={[1.593, -1.249, -3.11]}
                  scale={100}
                >
                  <mesh
                    name="Cube011_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube011_Metal_0.geometry}
                    material={materials.Metal}
                  />
                  <mesh
                    name="Cube011_SmoothPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube011_SmoothPlastic_0.geometry}
                    material={materials.SmoothPlastic}
                  />
                </group>
                <group
                  name="Cube012"
                  position={[71.845, -13.952, 95.954]}
                  rotation={[-1.577, 0.198, 0.001]}
                  scale={100}
                >
                  <mesh
                    name="Cube012_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube012_Metal_0.geometry}
                    material={materials.Metal}
                  />
                  <mesh
                    name="Cube012_SmoothPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube012_SmoothPlastic_0.geometry}
                    material={materials.SmoothPlastic}
                  />
                </group>
                <group
                  name="Cube014"
                  position={[71.845, -13.952, 95.954]}
                  rotation={[1.563, 0.198, 0.011]}
                  scale={-100}
                >
                  <mesh
                    name="Cube014_Metal_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube014_Metal_0.geometry}
                    material={materials.Metal}
                  />
                  <mesh
                    name="Cube014_SmoothPlastic_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube014_SmoothPlastic_0.geometry}
                    material={materials.SmoothPlastic}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/hacker-room.glb");

export default Robot;
