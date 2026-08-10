import { useMemo, useRef, type ElementRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

const ACCENT = '#6366f1';
const ACCENT_LIGHT = '#a5b4fc';

/** Coarse pointers (phones/tablets) get a lighter scene: fewer particles, no AA. */
const isCoarsePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * Volumetric point cloud. Positions are generated once and rendered as a single
 * draw call, so particle count costs almost nothing at runtime.
 */
const ParticleField = ({ count }: { count: number }) => {
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

/** drei's MeshDistortMaterial instance, which exposes a writable `distort`. */
type DistortMaterial = ElementRef<typeof MeshDistortMaterial>;

/**
 * Slowly morphing core with a wireframe shell around it.
 *
 * The core also reacts to pointer *velocity*: moving the cursor quickly across
 * the hero agitates the surface, and it settles back when you stop. Position
 * parallax alone (see CameraRig) reads as observing the object; reacting to
 * speed is what makes it feel like the object has mass.
 */
const Core = ({ interactive }: { interactive: boolean }) => {
  const inner = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const material = useRef<DistortMaterial>(null);

  const lastPointer = useRef(new THREE.Vector2());
  const agitation = useRef(0);

  const BASE_DISTORT = 0.34;
  const MAX_ADDED_DISTORT = 0.3;

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

    if (!interactive || !material.current) return;

    // Pointer travel this frame, normalised to speed rather than raw distance
    // so the response is frame-rate independent.
    const { pointer } = state;
    const travel = lastPointer.current.distanceTo(pointer);
    lastPointer.current.copy(pointer);
    const speed = delta > 0 ? travel / delta : 0;

    // Rise quickly toward the incoming speed, decay slowly back to rest.
    const target = Math.min(speed * 0.35, 1);
    const rate = target > agitation.current ? 8 : 2.2;
    agitation.current += (target - agitation.current) * Math.min(rate * delta, 1);

    material.current.distort = BASE_DISTORT + agitation.current * MAX_ADDED_DISTORT;
  });

  return (
    // Offset right and pushed back so the core sits in the gap between the
    // headline and the highlight panel rather than colliding with the name.
    <group position={[1.6, -0.2, -1]}>
      <Icosahedron ref={inner} args={[2.7, 16]}>
        <MeshDistortMaterial
          ref={material}
          color={ACCENT}
          distort={BASE_DISTORT}
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
 * Pointer-driven parallax plus scroll-linked depth. The camera eases toward the
 * target rather than tracking it directly, which is what makes the movement feel
 * weighted instead of mechanical. Scrolling pulls the camera back so the core
 * recedes as the next section arrives.
 */
const CameraRig = ({ enabled }: { enabled: boolean }) => {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 12));

  useFrame((_, delta) => {
    if (!enabled) return;

    // 0 at the top of the page, 1 once a full viewport has scrolled past.
    const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    const depth = 12 + progress * 7;

    target.current.set(pointer.x * 1.6, pointer.y * 1.0, depth);
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

const HeroScene = ({ reducedMotion = false }: HeroSceneProps) => {
  const coarse = useMemo(isCoarsePointer, []);
  const animate = !reducedMotion;

  return (
    <Canvas
      // `demand` renders one frame and stops, which is the correct reduced-motion
      // behaviour and avoids burning a rAF loop for a still image.
      frameloop={reducedMotion ? 'demand' : 'always'}
      camera={{ position: [0, 0, 12], fov: 50 }}
      // Touch devices pay the most for high DPR and MSAA, and benefit least -
      // bloom already softens the particle edges that AA would clean up.
      dpr={coarse ? [1, 1.25] : [1, 1.75]}
      gl={{ antialias: !coarse, alpha: true, powerPreference: 'high-performance' }}
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

      <Core interactive={animate} />
      <ParticleField count={coarse ? 1600 : 3500} />

      <CameraRig enabled={animate} />

      {/* Real bloom on the emissive core, replacing the stack of blurred CSS
          orbs that used to sit on top of this canvas and mush it. */}
      <EffectComposer>
        <Bloom
          intensity={coarse ? 0.5 : 0.85}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
        <Vignette offset={0.32} darkness={0.55} />
      </EffectComposer>
    </Canvas>
  );
};

export default HeroScene;
