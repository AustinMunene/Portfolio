import React, { useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const ACCENT = '#d4d4d8';
const ACCENT_LIGHT = '#f4f4f5';
const ACCENT_PALE = '#fafafa';

const NODE_COUNT = 34;
const LINK_RADIUS = 2.6;

/**
 * Deterministic pseudo-random so the graph is identical on every render and
 * between reloads. Math.random() here would reshuffle the layout on each mount.
 */
const seeded = (seed: number) => {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

type Graph = {
  positions: THREE.Vector3[];
  edges: Float32Array;
};

/** Nodes on a jittered sphere, edges between any pair closer than LINK_RADIUS. */
const buildGraph = (): Graph => {
  const positions: THREE.Vector3[] = [];

  for (let i = 0; i < NODE_COUNT; i += 1) {
    // Fibonacci sphere gives an even distribution; the jitter stops it looking
    // mechanically regular.
    const t = i / NODE_COUNT;
    const inclination = Math.acos(1 - 2 * t);
    const azimuth = Math.PI * (1 + Math.sqrt(5)) * i;
    const radius = 3.4 + seeded(i) * 0.9;

    positions.push(
      new THREE.Vector3(
        radius * Math.sin(inclination) * Math.cos(azimuth),
        radius * Math.sin(inclination) * Math.sin(azimuth) * 0.75,
        radius * Math.cos(inclination)
      )
    );
  }

  const points: number[] = [];
  for (let i = 0; i < positions.length; i += 1) {
    for (let j = i + 1; j < positions.length; j += 1) {
      if (positions[i].distanceTo(positions[j]) < LINK_RADIUS) {
        points.push(
          positions[i].x, positions[i].y, positions[i].z,
          positions[j].x, positions[j].y, positions[j].z
        );
      }
    }
  }

  return { positions, edges: new Float32Array(points) };
};

/** All nodes in one instanced draw call. */
const Nodes = ({ positions }: { positions: THREE.Vector3[] }) => {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    positions.forEach((position, i) => {
      // Each node breathes on its own offset so the graph feels alive.
      const scale = 0.85 + Math.sin(t * 1.1 + i * 0.7) * 0.15;
      dummy.position.copy(position);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, positions.length]}>
      <sphereGeometry args={[0.13, 16, 16]} />
      <meshStandardMaterial
        color={ACCENT_PALE}
        emissive={ACCENT}
        emissiveIntensity={1.1}
        roughness={0.3}
        metalness={0.6}
      />
    </instancedMesh>
  );
};

const Edges = ({ edges }: { edges: Float32Array }) => (
  <lineSegments>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[edges, 3]} />
    </bufferGeometry>
    <lineBasicMaterial
      color={ACCENT_LIGHT}
      transparent
      opacity={0.22}
      blending={THREE.AdditiveBlending}
      depthWrite={false}
    />
  </lineSegments>
);

const Graph = () => {
  const group = useRef<THREE.Group>(null);
  const { positions, edges } = useMemo(buildGraph, []);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={group}>
      <Nodes positions={positions} />
      <Edges edges={edges} />
    </group>
  );
};

const Interactive3DScene: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="spotlight surface-depth bg-white/[0.02] rounded-2xl overflow-hidden border border-white/[0.06]"
    >
      <div className="p-4 border-b border-white/[0.06]">
        <h3 className="text-lg font-semibold">Module Graph</h3>
        <p className="text-sm text-gray-400 mt-1">
          An instanced force-graph rendered with Three.js and React Three Fiber. Drag to orbit.
        </p>
      </div>

      <div className={`relative ${isExpanded ? 'h-[600px]' : 'h-[400px]'}`}>
        <Canvas
          camera={{ position: [0, 0, 11], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.75]}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <fog attach="fog" args={['#05050a', 12, 30]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[8, 6, 10]} intensity={2.4} color={ACCENT_LIGHT} />
            <pointLight position={[-8, -4, 4]} intensity={1.6} color={ACCENT} />
            <Graph />
            <OrbitControls
              enablePan={false}
              enableZoom
              autoRotate
              autoRotateSpeed={0.4}
              minDistance={7}
              maxDistance={18}
              dampingFactor={0.08}
            />
          </Suspense>
        </Canvas>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white text-sm hover:bg-white/[0.1] hover:border-accent-500/40 transition-colors"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      <div className="p-4 border-t border-white/[0.06]">
        <h4 className="text-sm font-semibold mb-2">Controls</h4>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>• Drag: orbit the graph</li>
          <li>• Scroll: zoom in and out</li>
          <li>• Release: inertial damping settles the rotation</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Interactive3DScene;
