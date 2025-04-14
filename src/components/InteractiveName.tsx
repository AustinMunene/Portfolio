import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Center } from '@react-three/drei';
import * as THREE from 'three';

const Name3D = () => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      // Subtle floating animation
      textRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Gentle rotation based on mouse position
      textRef.current.rotation.y = THREE.MathUtils.lerp(
        textRef.current.rotation.y,
        (state.mouse.x * Math.PI) / 10,
        0.05
      );
      textRef.current.rotation.x = THREE.MathUtils.lerp(
        textRef.current.rotation.x,
        (state.mouse.y * Math.PI) / 10,
        0.05
      );
    }
  });

  return (
    <Center>
      <Text
        ref={textRef}
        fontSize={1.5}
        font="/fonts/Inter-Bold.woff"
        characters="Austin Munene"
        anchorX="center"
        anchorY="middle"
      >
        Austin Munene
        <meshStandardMaterial
          color="#4F46E5"
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1}
        />
      </Text>
    </Center>
  );
};

const InteractiveName: React.FC = () => {
  return (
    <div className="h-[300px] w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[-5, 5, 0]}
          angle={0.15}
          penumbra={1}
          intensity={0.5}
        />
        <Name3D />
      </Canvas>
    </div>
  );
};

export default InteractiveName; 