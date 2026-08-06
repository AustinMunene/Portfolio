import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ACCENT = '#6366f1';
const ACCENT_LIGHT = '#a5b4fc';

/**
 * Volumetric point cloud. Positions are generated once and rendered as a single
 * draw call, so particle count costs almost nothing at runtime.
 */
const ParticleField = ({ count = 3500 }: { count?: number }) => {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      // Rejection-free spherical shell distribution, biased outward so the
      // centre stays clear for the core geometry.
      const radius = 5 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      array[i * 3 + 2] = radius * Math.cos(phi);
    }
    return array;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x += delta * 0.006;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={ACCENT_LIGHT}
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

/** Slowly morphing core with a wireframe shell around it. */
const Core = () => {
  const inner = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (inner.current) {
      inner.current.rotation.y += delta * 0.12;
      inner.current.rotation.z += delta * 0.05;
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.06;
      shell.current.rotation.x += delta * 0.03;
      const pulse = 1 + Math.sin(t * 0.6) * 0.03;
      shell.current.scale.setScalar(pulse);
    }
  });

  return (
    // Offset right and pushed back so the core sits in the gap between the
    // headline and the highlight panel rather than colliding with the name.
    <group position={[1.6, -0.2, -1]}>
      <Icosahedron ref={inner} args={[2.7, 16]}>
        <MeshDistortMaterial
          color={ACCENT}
          distort={0.34}
          speed={1.2}
          roughness={0.18}
          metalness={0.95}
          emissive={ACCENT}
          emissiveIntensity={0.55}
        />
      </Icosahedron>

      <Icosahedron ref={shell} args={[4.25, 2]}>
        <meshBasicMaterial
          color={ACCENT_LIGHT}
          wireframe
          transparent
          opacity={0.26}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Icosahedron>
    </group>
  );
};

/**
 * Pointer-driven parallax. The camera eases toward the target rather than
 * tracking it directly, which is what makes the movement feel weighted instead
 * of mechanical.
 */
const CameraRig = ({ enabled }: { enabled: boolean }) => {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 12));

  useFrame((_, delta) => {
    if (!enabled) return;
    target.current.set(pointer.x * 1.6, pointer.y * 1.0, 12);
    // Frame-rate independent easing.
    const alpha = 1 - Math.pow(0.0015, delta);
    camera.position.lerp(target.current, alpha);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

type HeroSceneProps = {
  /** When true the scene renders a single static frame and never animates. */
  reducedMotion?: boolean;
};

const HeroScene = ({ reducedMotion = false }: HeroSceneProps) => (
  <Canvas
    // `demand` renders one frame and stops, which is the correct reduced-motion
    // behaviour and avoids burning a rAF loop for a still image.
    frameloop={reducedMotion ? 'demand' : 'always'}
    camera={{ position: [0, 0, 12], fov: 50 }}
    dpr={[1, 1.75]}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    performance={{ min: 0.5 }}
    style={{ position: 'absolute', inset: 0 }}
  >
    {/* Far enough back that it only softens the outer particle shell. Starting
        it at 9 washed the core out before its shape was readable. */}
    <fog attach="fog" args={['#05050a', 17, 46]} />

    <ambientLight intensity={0.5} />
    <pointLight position={[7, 5, 9]} intensity={3.4} color={ACCENT_LIGHT} />
    <pointLight position={[-9, -5, 4]} intensity={2} color={ACCENT} />
    {/* Rim light: separates the core silhouette from the background. */}
    <pointLight position={[-3, 3, -8]} intensity={2.6} color="#c7d2fe" />

    <Core />
    <ParticleField />

    <CameraRig enabled={!reducedMotion} />
  </Canvas>
);

export default HeroScene;
