import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../store';

const CrowdParticles = ({ count = 500 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { sectors } = useStore();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        const time = Math.random() * 100;
        const factor = 10 + Math.random() * 20;
        const speed = 0.01 + Math.random() / 200;
        const x = Math.sin(i) * 6;
        const y = Math.cos(i) * 6;
        const z = -2 + Math.random() * 4;
        temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { time, factor, speed, x, y, z } = particle;
      time = particle.time = time + speed;
      const s = Math.cos(time);
      dummy.position.set(x, y, z);
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
    });
    mesh.current!.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 10, 10]} />
      <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} transparent opacity={0.6} />
    </instancedMesh>
  );
};

const StadiumShell = () => {
    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[5, 6, 64]} />
                <meshStandardMaterial color="#333" roughness={0} metalness={1} side={THREE.DoubleSide} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
                <ringGeometry args={[4.8, 5, 64]} />
                <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={5} side={THREE.DoubleSide} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[4.8, 64]} />
                <meshStandardMaterial color="#050505" />
            </mesh>
        </group>
    );
};

export const Stadium3D: React.FC = () => {
  return (
    <div className="w-full h-[400px] bg-black/40 rounded-3xl overflow-hidden border border-white/10 relative">
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
         <h4 className="text-white font-black italic tracking-tighter uppercase text-xs">Live 3D Density Matrix</h4>
         <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Real-time Spatial Tracking</p>
      </div>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 10, 15]} fov={50} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
        <pointLight position={[-10, 10, 10]} intensity={1} color="#7000ff" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <StadiumShell />
            <CrowdParticles count={800} />
        </Float>
      </Canvas>
      
      <div className="absolute bottom-6 right-6 z-10 pointer-events-none flex gap-4">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#00f2ff]" />
            <span className="text-[10px] text-white/60 font-black uppercase">Low Density</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#7000ff]" />
            <span className="text-[10px] text-white/60 font-black uppercase">Active Flow</span>
         </div>
      </div>
    </div>
  );
};
