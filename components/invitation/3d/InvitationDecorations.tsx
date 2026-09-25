"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

type InvitationDecorationsProps = {
  color: string;
};

type OrnamentProps = {
  position: [number, number, number];
  color: string;
};

type FloatingParticleProps = {
  position: [number, number, number];
  color: string;
  speed: number;
};

function Ornament({
  position,
  color,
}: OrnamentProps) {
  return (
    <group position={position}>
      {/* Center jewel */}
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />

        <meshStandardMaterial
          color={color}
          metalness={0.5}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Top petal */}
      <mesh position={[0, 0.16, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />

        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>

      {/* Bottom petal */}
      <mesh position={[0, -0.16, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />

        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>

      {/* Left petal */}
      <mesh position={[-0.16, 0, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />

        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>

      {/* Right petal */}
      <mesh position={[0.16, 0, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />

        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>

      {/* Small outer diamonds */}
      <mesh
        position={[0.24, 0.24, 0]}
        rotation={[0, 0, Math.PI / 4]}
      >
        <boxGeometry args={[0.07, 0.07, 0.025]} />

        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>

      <mesh
        position={[-0.24, 0.24, 0]}
        rotation={[0, 0, Math.PI / 4]}
      >
        <boxGeometry args={[0.07, 0.07, 0.025]} />

        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>

      <mesh
        position={[0.24, -0.24, 0]}
        rotation={[0, 0, Math.PI / 4]}
      >
        <boxGeometry args={[0.07, 0.07, 0.025]} />

        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>

      <mesh
        position={[-0.24, -0.24, 0]}
        rotation={[0, 0, Math.PI / 4]}
      >
        <boxGeometry args={[0.07, 0.07, 0.025]} />

        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

function FloatingParticle({
  position,
  color,
  speed,
}: FloatingParticleProps) {
  const particleRef = useRef<Group>(null);

  useFrame((state) => {
    if (!particleRef.current) {
      return;
    }

    const time = state.clock.getElapsedTime();

    particleRef.current.position.y =
      position[1] + Math.sin(time * speed) * 0.08;

    particleRef.current.position.x =
      position[0] + Math.cos(time * speed * 0.7) * 0.03;

    particleRef.current.rotation.z =
      time * speed;
  });

  return (
    <group
      ref={particleRef}
      position={position}
    >
      <mesh>
        <sphereGeometry args={[0.025, 12, 12]} />

        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

export default function InvitationDecorations({
  color,
}: InvitationDecorationsProps) {
  return (
    <group>
      {/* Top ornament */}
      <Ornament
        position={[0, 2.18, 0.2]}
        color={color}
      />

      {/* Bottom ornament */}
      <Ornament
        position={[0, -2.18, 0.2]}
        color={color}
      />

      {/* Floating particles */}
      <FloatingParticle
        position={[-2.1, 1.7, 0]}
        color={color}
        speed={0.7}
      />

      <FloatingParticle
        position={[2.0, 1.1, 0]}
        color={color}
        speed={0.9}
      />

      <FloatingParticle
        position={[-2.0, -1.0, 0]}
        color={color}
        speed={0.8}
      />

      <FloatingParticle
        position={[2.1, -1.6, 0]}
        color={color}
        speed={1}
      />
    </group>
  );
}