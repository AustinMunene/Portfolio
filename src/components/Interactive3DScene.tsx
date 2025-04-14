import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, Vector3 } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Cylinder, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

type Position = [number, number, number];

interface ComponentProps {
  position?: Position;
  color?: string;
}

// Simple rotating cube component
const RotatingCube: React.FC<ComponentProps> = ({ position = [-2, 0, 0], color = 'hotpink' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });
  
  return (
    <Box ref={meshRef} position={position} args={[1, 1, 1]}>
      <meshStandardMaterial color={color} />
    </Box>
  );
};

// Floating sphere component
const FloatingSphere: React.FC<ComponentProps> = ({ position = [0, 0, 0], color = 'lightblue' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });
  
  return (
    <Sphere ref={meshRef} position={position} args={[0.5, 32, 32]}>
      <meshStandardMaterial color={color} />
    </Sphere>
  );
};

// Rotating cylinder component
const RotatingCylinder: React.FC<ComponentProps> = ({ position = [2, 0, 0], color = 'lightgreen' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.7;
    }
  });
  
  return (
    <Cylinder ref={meshRef} position={position} args={[0.5, 0.5, 1, 32]}>
      <meshStandardMaterial color={color} />
    </Cylinder>
  );
};

// Main 3D scene component
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <RotatingCube position={[-2, 0, 0]} color="hotpink" />
      <FloatingSphere position={[0, 0, 0]} color="lightblue" />
      <RotatingCylinder position={[2, 0, 0]} color="lightgreen" />
      <OrbitControls />
    </>
  );
};

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-gray-400">Loading 3D Scene...</div>
  </div>
);

// Wrapper component with controls
const Interactive3DScene: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800"
    >
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-lg font-semibold">Interactive 3D Scene</h3>
        <p className="text-sm text-gray-400 mt-1">
          Explore this interactive 3D scene built with Three.js and React Three Fiber.
        </p>
      </div>
      
      <div className={`relative ${isExpanded ? 'h-[600px]' : 'h-[400px]'}`}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
        
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 transition-colors"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <h4 className="text-sm font-semibold mb-2">Controls:</h4>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>• Left-click + drag: Rotate the scene</li>
          <li>• Right-click + drag: Pan the scene</li>
          <li>• Scroll: Zoom in/out</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Interactive3DScene; 