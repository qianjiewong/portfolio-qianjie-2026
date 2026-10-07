import { Clone, Environment, Float, Lightformer, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type IslandStop = "projects" | "about" | "skills" | "contact";

type StopConfig = {
  id: IslandStop;
  label: string;
  position: [number, number, number];
  accent: string;
};

export const STOPS = [
  { id: "projects", label: "Project Grove", position: [-4.4, 1.05, -1.8], accent: "#f27b52" },
  { id: "about", label: "About Lookout", position: [3.8, 1.45, -2.9], accent: "#f5c451" },
  { id: "skills", label: "Skill Workshop", position: [3.6, 1.05, 3.1], accent: "#4eb4a8" },
  { id: "contact", label: "Contact Cove", position: [-3.8, 0.8, 3.4], accent: "#dc72a4" },
] satisfies StopConfig[];

const CAMERA_POSITIONS: Record<IslandStop | "overview", THREE.Vector3> = {
  overview: new THREE.Vector3(13, 12, 15),
  projects: new THREE.Vector3(-8.5, 6.5, 4.8),
  about: new THREE.Vector3(7.8, 7.4, 4.2),
  skills: new THREE.Vector3(8.5, 6.2, 7.8),
  contact: new THREE.Vector3(-7.8, 5.2, 8.7),
};

const CAMERA_TARGETS: Record<IslandStop | "overview", THREE.Vector3> = {
  overview: new THREE.Vector3(0, 0.6, 0),
  projects: new THREE.Vector3(-4.4, 1, -1.8),
  about: new THREE.Vector3(3.8, 1.2, -2.9),
  skills: new THREE.Vector3(3.6, 1, 3.1),
  contact: new THREE.Vector3(-3.8, 0.5, 3.4),
};

function CameraRig({ selected }: { selected: IslandStop | null }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  const key = selected ?? "overview";

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const smoothing = 1 - Math.exp(-3.2 * delta);
    camera.position.lerp(CAMERA_POSITIONS[key], smoothing);
    target.current.lerp(CAMERA_TARGETS[key], smoothing);
    camera.lookAt(target.current);
  });

  return null;
}

function Asset({ path, position, scale = 1, rotation = 0 }: { path: string; position: [number, number, number]; scale?: number; rotation?: number }) {
  const { scene } = useGLTF(path);
  return <Clone object={scene} position={position} scale={scale} rotation-y={rotation} castShadow />;
}

function TreeCluster() {
  const trees = useMemo(() => [
    [-6.4, 0.55, -3.5, 0.72, 0], [-6.7, 0.55, 1.7, 0.66, 0.6], [-1.7, 0.55, -5.6, 0.62, 1.1],
    [5.9, 0.55, -0.5, 0.72, 2.2], [1.1, 0.55, 5.6, 0.6, 1.8], [5.8, 0.55, 4.3, 0.62, 0.4],
  ] as const, []);
  return <>{trees.map(([x, y, z, scale, rotation], index) => <Asset key={index} path="/models/tree_default.glb" position={[x, y, z]} scale={scale} rotation={rotation} />)}</>;
}

function House({ color }: { color: string }) {
  return (
    <group>
      <mesh position-y={0.7} castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.45, 2]} />
        <meshStandardMaterial color="#fff4df" roughness={0.9} />
      </mesh>
      <mesh position-y={1.75} rotation-y={Math.PI / 4} castShadow>
        <coneGeometry args={[1.95, 1.3, 4]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.65, 1.03]} castShadow>
        <boxGeometry args={[0.62, 1.15, 0.09]} />
        <meshStandardMaterial color="#7a5542" />
      </mesh>
      <mesh position={[-0.75, 0.92, 1.04]}>
        <boxGeometry args={[0.48, 0.48, 0.08]} />
        <meshStandardMaterial color="#9ed9dd" emissive="#5aa7ad" emissiveIntensity={0.14} />
      </mesh>
    </group>
  );
}

function Lookout() {
  return (
    <group>
      <mesh position-y={1.25} castShadow>
        <cylinderGeometry args={[0.85, 1.15, 2.5, 8]} />
        <meshStandardMaterial color="#f5e4c6" />
      </mesh>
      <mesh position-y={2.55} castShadow>
        <coneGeometry args={[1.25, 1.1, 8]} />
        <meshStandardMaterial color="#e9b64b" />
      </mesh>
      <mesh position={[0, 1.6, 0.88]}>
        <circleGeometry args={[0.28, 16]} />
        <meshStandardMaterial color="#78c4d0" />
      </mesh>
    </group>
  );
}

function Dock() {
  return (
    <group>
      {[0, 0.65, 1.3].map((z) => (
        <mesh key={z} position={[0, 0.2, z]} castShadow>
          <boxGeometry args={[2.8, 0.22, 0.48]} />
          <meshStandardMaterial color="#b77a4f" />
        </mesh>
      ))}
      <Asset path="/models/canoe.glb" position={[1.1, 0.14, 1.9]} scale={0.78} rotation={0.4} />
    </group>
  );
}

function Landmark({ stop, selected, onSelect, children }: { stop: StopConfig; selected: IslandStop | null; onSelect: (id: IslandStop) => void; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => { document.body.style.cursor = "auto"; };
  }, [hovered]);

  useFrame((state) => {
    if (!group.current) return;
    const desired = hovered || selected === stop.id ? 1.06 : 1;
    const next = THREE.MathUtils.lerp(group.current.scale.x, desired, 0.12);
    group.current.scale.setScalar(next);
    group.current.position.y = stop.position[1] + Math.sin(state.clock.elapsedTime * 1.8 + stop.position[0]) * 0.035;
  });

  return (
    <group
      ref={group}
      position={stop.position}
      onClick={(event) => { event.stopPropagation(); onSelect(stop.id); }}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      {children}
      <mesh position={[0, 0.15, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[1.45, 1.62, 32]} />
        <meshStandardMaterial color={stop.accent} emissive={stop.accent} emissiveIntensity={selected === stop.id ? 0.45 : 0.08} />
      </mesh>
    </group>
  );
}

export function IslandScene({ selected, onSelect }: { selected: IslandStop | null; onSelect: (id: IslandStop) => void }) {
  return (
    <>
      <color attach="background" args={["#8ed5dd"]} />
      <fog attach="fog" args={["#8ed5dd", 24, 48]} />
      <hemisphereLight args={["#dff8ff", "#5a8f72", 1.5]} />
      <directionalLight position={[8, 15, 8]} intensity={2.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-camera-left={-13} shadow-camera-right={13} shadow-camera-top={13} shadow-camera-bottom={-13} />
      <Environment>
        <Lightformer intensity={2} position={[0, 8, 0]} scale={[18, 18, 1]} />
        <Lightformer intensity={0.8} color="#cfefff" position={[-8, 3, -3]} rotation-y={Math.PI / 2} scale={[16, 3, 1]} />
      </Environment>
      <CameraRig selected={selected} />

      <group>
        <mesh position-y={-1.3} receiveShadow>
          <cylinderGeometry args={[8.8, 7.3, 2.5, 40]} />
          <meshStandardMaterial color="#d8b86a" roughness={1} />
        </mesh>
        <mesh position-y={0.03} receiveShadow>
          <cylinderGeometry args={[8.15, 8.65, 0.35, 40]} />
          <meshStandardMaterial color="#79b56d" roughness={0.92} />
        </mesh>
        <mesh position-y={-1.45} receiveShadow>
          <cylinderGeometry args={[16, 16, 0.15, 64]} />
          <meshStandardMaterial color="#55a9bd" roughness={0.5} metalness={0.05} />
        </mesh>
        <mesh position-y={0.24} rotation-x={-Math.PI / 2} receiveShadow>
          <ringGeometry args={[2.6, 3.25, 48]} />
          <meshStandardMaterial color="#e7d69c" />
        </mesh>
      </group>

      <TreeCluster />
      <Asset path="/models/tree_palm.glb" position={[-5.7, 0.5, 4.8]} scale={0.8} rotation={0.5} />
      <Asset path="/models/tree_palm.glb" position={[-1.8, 0.5, 6.1]} scale={0.68} rotation={-0.6} />
      <Asset path="/models/rock_largeA.glb" position={[6.2, 0.45, 1.7]} scale={0.65} rotation={0.9} />
      <Asset path="/models/plant_bush.glb" position={[0.5, 0.38, -5.4]} scale={0.72} />
      <Float speed={1.4} floatIntensity={0.12} rotationIntensity={0.02}>
        <mesh position={[-0.2, 0.42, 0.1]} castShadow>
          <cylinderGeometry args={[1.5, 1.8, 0.34, 32]} />
          <meshStandardMaterial color="#f1d58e" />
        </mesh>
      </Float>

      {STOPS.map((stop) => (
        <Landmark key={stop.id} stop={stop} selected={selected} onSelect={onSelect}>
          {stop.id === "projects" && <House color="#e66f4e" />}
          {stop.id === "about" && <Lookout />}
          {stop.id === "skills" && <House color="#4ca69f" />}
          {stop.id === "contact" && <Dock />}
        </Landmark>
      ))}
    </>
  );
}

useGLTF.preload("/models/tree_default.glb");
useGLTF.preload("/models/tree_palm.glb");
useGLTF.preload("/models/plant_bush.glb");
useGLTF.preload("/models/rock_largeA.glb");
useGLTF.preload("/models/canoe.glb");
