import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box } from '@react-three/drei';
import * as THREE from 'three';

interface ButtonProps {
  text: string;
  onClick: () => void;
  position?: [number, number, number];
  color?: string;
}

const Button3D: React.FC<ButtonProps> = ({ text, onClick, position = [0, 0, 0], color = '#4F46E5' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      // Hover animation
      meshRef.current.scale.x = THREE.MathUtils.lerp(
        meshRef.current.scale.x,
        hovered ? 1.1 : 1,
        0.1
      );
      meshRef.current.scale.y = THREE.MathUtils.lerp(
        meshRef.current.scale.y,
        hovered ? 1.1 : 1,
        0.1
      );
      
      // Click animation
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        clicked ? -0.2 : 0,
        0.1
      );
    }
  });

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
      onClick();
    }, 200);
  };

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[2, 0.5, 0.1]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={color}
          metalness={0.5}
          roughness={0.2}
          envMapIntensity={1}
        />
      </Box>
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};

const InteractiveButton: React.FC<ButtonProps> = (props) => {
  return (
    <div className="h-[200px] w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Button3D {...props} />
      </Canvas>
    </div>
  );
};

export default InteractiveButton; 