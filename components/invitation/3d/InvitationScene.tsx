"use client";

import { useRef } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  Text,
} from "@react-three/drei";

import type { Group } from "three";
import type { InvitationTemplate } from "@/types/template";

import InvitationDecorations from "@/components/invitation/3d/InvitationDecorations";

type InvitationSceneProps = {
  template: InvitationTemplate;
  title?: string;
  date?: string;
  venue?: string;
};

function InvitationGlow({
  color,
}: {
  color: string;
}) {
  return (
    <mesh position={[0, 0, -0.25]}>
      <planeGeometry args={[4.8, 5.8]} />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </mesh>
  );
}

function InvitationCard({
  template,
  title,
  date,
  venue,
  isInteracting,
}: InvitationSceneProps & {
  isInteracting: React.RefObject<boolean | null>;
}) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current || isInteracting.current) {
      return;
    }

    const time = state.clock.getElapsedTime();

    // Gentle idle rotation
    groupRef.current.rotation.y =
      0.12 + Math.sin(time * 0.5) * 0.04;

    // Gentle floating motion
    groupRef.current.position.y =
      Math.sin(time * 0.8) * 0.03;
  });

  return (
    <group ref={groupRef}>
      {/* Card body */}
      <RoundedBox
        args={[3.6, 4.8, 0.2]}
        radius={0.12}
        smoothness={6}
      >
        <meshStandardMaterial
          color={template.theme.backgroundColor}
          roughness={0.35}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Inner card */}
      <mesh position={[0, 0, 0.12]}>
        <planeGeometry args={[3.25, 4.45]} />

        <meshStandardMaterial
          color={template.theme.backgroundColor}
          roughness={0.4}
        />
      </mesh>

      {/* Category */}
      <Text
        position={[0, 1.65, 0.15]}
        fontSize={0.16}
        color={template.theme.accentColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {template.category.toUpperCase()}
      </Text>

      {/* Main title */}
      <Text
        position={[0, 0.85, 0.15]}
        fontSize={0.38}
        color={template.theme.textColor}
        anchorX="center"
        anchorY="middle"
        maxWidth={2.8}
      >
        {title ?? "You're Invited"}
      </Text>

      {/* Decorative divider */}
      <mesh position={[0, 0.25, 0.15]}>
        <planeGeometry args={[0.9, 0.015]} />

        <meshStandardMaterial
          color={template.theme.accentColor}
        />
      </mesh>

      {/* Names */}
      <Text
        position={[0, -0.15, 0.15]}
        fontSize={0.25}
        color={template.theme.textColor}
        anchorX="center"
        anchorY="middle"
      >
        Vignesh & Guest
      </Text>

      {/* Date */}
      <Text
        position={[0, -0.75, 0.15]}
        fontSize={0.14}
        color={template.theme.secondaryColor}
        anchorX="center"
        anchorY="middle"
      >
        {date ?? "Saturday, 24 October 2026"}
      </Text>

      {/* Venue */}
      <Text
        position={[0, -1.05, 0.15]}
        fontSize={0.13}
        color={template.theme.secondaryColor}
        anchorX="center"
        anchorY="middle"
      >
        {venue ?? "Chennai, Tamil Nadu"}
      </Text>

      {/* Bottom decoration */}
      <mesh position={[0, -1.65, 0.15]}>
        <circleGeometry args={[0.08, 32]} />

        <meshStandardMaterial
          color={template.theme.accentColor}
        />
      </mesh>
    </group>
  );
}

export default function InvitationScene({
  template,
  title,
  date,
  venue,
}: InvitationSceneProps) {
  const isInteracting = useRef(false);

  return (
    <div
      className="h-[520px] w-full overflow-hidden rounded-3xl border sm:h-[600px]"
      style={{
        backgroundColor: template.theme.backgroundColor,
        borderColor: `${template.theme.primaryColor}66`,
        touchAction: "none",
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 45,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={1.5} />

        {/* Main directional light */}
        <directionalLight
          position={[4, 5, 6]}
          intensity={2}
          color={template.theme.secondaryColor}
        />

        {/* Accent light */}
        <pointLight
          position={[-4, -2, 4]}
          intensity={1}
          color={template.theme.accentColor}
        />

        {/* Soft background glow */}
        <InvitationGlow
          color={template.theme.primaryColor}
        />

        {/* Decorative elements */}
        <InvitationDecorations
          color={template.theme.accentColor}
        />

        {/* 3D invitation card */}
        <InvitationCard
          template={template}
          title={title}
          date={date}
          venue={venue}
          isInteracting={isInteracting}
        />

        {/* Mouse + touch interaction */}
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={9}
          enableDamping
          dampingFactor={0.08}
          onStart={() => {
            isInteracting.current = true;
          }}
          onEnd={() => {
            isInteracting.current = false;
          }}
        />
      </Canvas>
    </div>
  );
}