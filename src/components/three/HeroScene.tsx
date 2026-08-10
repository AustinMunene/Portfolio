import { useMemo, useRef, type ElementRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

// Monochrome. A greyscale emissive core reads as machined metal under bloom
// rather than as a coloured light source, which is what keeps the scene in the
// same black-and-white world as the rest of the page.
const ACCENT = '#c9c9cf';
const ACCENT_LIGHT = '#f2f2f5';

/** Coarse pointers (phones/tablets) get a lighter scene: fewer particles, no AA. */
const isCoarsePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * Volumetric point cloud. Positions are generated once and rendered as a single
 * draw call, so particle count costs almost nothing at runtime.
 */
const ParticleField = ({
  count,
  color,
  light,
}: {
  count: number;
  color: string;
  light: boolean;
}) => {
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
        color={color}
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={light ? 0.45 : 0.7}
        blending={light ? THREE.NormalBlending : THREE.AdditiveBlending}
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
const Core = ({
  interactive,
  core,
  filament,
  light,
}: {
  interactive: boolean;
  core: string;
  filament: string;
  light: boolean;
}) => {
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
          color={core}
          distort={BASE_DISTORT}
          speed={1.2}
          roughness={light ? 0.75 : 0.18}
          // Metalness with no environment map renders almost black, which is why
          // a near-white core still came out as a dark blob on light. Metals need
          // something to reflect; on light we go fully diffuse instead.
          metalness={light ? 0 : 0.95}
          emissive={core}
          // No self-illumination on light: an emissive object on white just
          // flattens into a pale blob with no readable form.
          emissiveIntensity={light ? 0 : 0.55}
        />
      </Icosahedron>

      <Icosahedron ref={shell} args={[4.25, 2]}>
        <meshBasicMaterial
          color={filament}
          wireframe
          transparent
          opacity={light ? 0.16 : 0.26}
          // Additive blending brightens whatever is behind it, which is invisible
          // on a white page - normal blending keeps the wireframe readable.
          blending={light ? THREE.NormalBlending : THREE.AdditiveBlending}
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
  /** Drives geometry colour and whether bloom applies. */
  theme?: 'light' | 'dark';
};

const HeroScene = ({ reducedMotion = false, theme = 'dark' }: HeroSceneProps) => {
  const coarse = useMemo(isCoarsePointer, []);
  const animate = !reducedMotion;
  const isLight = theme === 'light';

  // On light the geometry sits only slightly off the page colour. A mid-grey core
  // read as a heavy black amoeba covering the copy - the portrait is the focal
  // point in light mode, so the scene drops to a faint embossed presence.
  // Bloom is skipped entirely: it brightens already-bright pixels, so against
  // white it adds a wash over the copy and no glow.
  const core = isLight ? '#e7e7ea' : ACCENT;
  const filament = isLight ? '#b4b4bb' : ACCENT_LIGHT;

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
          it at 9 washed the core out before its shape was readable. Fog has to
          match the page or it silhouettes the scene against a grey box. */}
      <fog attach="fog" args={[isLight ? '#ffffff' : '#050505', 17, 46]} />

      <ambientLight intensity={isLight ? 0.85 : 0.5} />
      <pointLight position={[7, 5, 9]} intensity={3.4} color={filament} />
      <pointLight position={[-9, -5, 4]} intensity={2} color={core} />
      {/* Rim light: separates the core silhouette from the background. */}
      <pointLight position={[-3, 3, -8]} intensity={2.6} color={isLight ? '#71717a' : '#fafafa'} />

      <Core interactive={animate} core={core} filament={filament} light={isLight} />
      <ParticleField count={coarse ? 1600 : 3500} color={filament} light={isLight} />

      <CameraRig enabled={animate} />

      {/* Bloom replaces the stack of blurred CSS orbs that used to sit on top of
          this canvas and mush it. Skipped on light: bloom only brightens already
          bright pixels, so against white it adds a wash over the copy and no glow. */}
      {!isLight && (
        <EffectComposer>
          <Bloom
            // Pulled back from 0.85: a near-white emissive blooms far harder than
            // the amber one did and blew out the core's silhouette.
            intensity={coarse ? 0.42 : 0.72}
            luminanceThreshold={0.22}
            luminanceSmoothing={0.85}
            mipmapBlur
          />
          <Vignette offset={0.32} darkness={0.55} />
        </EffectComposer>
      )}
    </Canvas>
  );
};

export default HeroScene;
