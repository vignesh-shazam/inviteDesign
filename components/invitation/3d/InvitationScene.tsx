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
  category?: string;
  title?: string;
  person1Name?: string;
  person2Name?: string;
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
  category,
  title,
  person1Name,
  person2Name,
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

  const displayCategory =
    category || template.category;

  const hasPersonNames =
    displayCategory === "Wedding" &&
    Boolean(person1Name?.trim()) &&
    Boolean(person2Name?.trim());

  const displayNames = hasPersonNames
    ? `${person1Name!.trim()} & ${person2Name!.trim()}`
    : "";

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

      {/* Event Category */}
      <Text
        position={[0, 1.65, 0.15]}
        fontSize={0.16}
        color={template.theme.accentColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {displayCategory.toUpperCase()}
      </Text>

      {/* Main Title */}
      <Text
        position={[0, 0.85, 0.15]}
        fontSize={0.38}
        color={template.theme.textColor}
        anchorX="center"
        anchorY="middle"
        maxWidth={2.8}
        overflowWrap="break-word"
      >
        {title ?? "You're Invited"}
      </Text>

      {/* Decorative Divider */}
      <mesh position={[0, 0.25, 0.15]}>
        <planeGeometry args={[0.9, 0.015]} />

        <meshStandardMaterial
          color={template.theme.accentColor}
        />
      </mesh>

      {/* Person Names - Wedding Only */}
      {hasPersonNames && (
        <Text
          position={[0, -0.15, 0.15]}
          fontSize={0.25}
          color={template.theme.textColor}
          anchorX="center"
          anchorY="middle"
          maxWidth={2.8}
        >
          {displayNames}
        </Text>
      )}

      {/* Date */}
      <Text
        position={[
          0,
          hasPersonNames ? -0.75 : -0.15,
          0.15,
        ]}
        fontSize={0.14}
        color={template.theme.secondaryColor}
        anchorX="center"
        anchorY="middle"
        maxWidth={2.8}
      >
        {date ?? "Saturday, 24 October 2026"}
      </Text>

      {/* Venue */}
      <Text
        position={[
          0,
          hasPersonNames ? -1.05 : -0.45,
          0.15,
        ]}
        fontSize={0.13}
        color={template.theme.secondaryColor}
        anchorX="center"
        anchorY="middle"
        maxWidth={2.8}
        overflowWrap="break-word"
      >
        {venue ?? "Chennai, Tamil Nadu"}
      </Text>

      {/* Bottom Decoration */}
      <mesh
        position={[
          0,
          hasPersonNames ? -1.65 : -1.35,
          0.15,
        ]}
      >
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
  category,
  title,
  person1Name,
  person2Name,
  date,
  venue,
}: InvitationSceneProps) {
  const isInteracting = useRef(false);

  return (
    <div
      className="h-[520px] w-full overflow-hidden rounded-3xl border sm:h-[600px]"
      style={{
        backgroundColor:
          template.theme.backgroundColor,

        borderColor:
          `${template.theme.primaryColor}66`,

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
        {/* Ambient Lighting */}
        <ambientLight intensity={1.5} />

        {/* Main Directional Light */}
        <directionalLight
          position={[4, 5, 6]}
          intensity={2}
          color={template.theme.secondaryColor}
        />

        {/* Accent Light */}
        <pointLight
          position={[-4, -2, 4]}
          intensity={1}
          color={template.theme.accentColor}
        />

        {/* Soft Background Glow */}
        <InvitationGlow
          color={template.theme.primaryColor}
        />

        {/* Decorative Elements */}
        <InvitationDecorations
          color={template.theme.accentColor}
        />

        {/* 3D Invitation Card */}
        <InvitationCard
          template={template}
          category={category}
          title={title}
          person1Name={person1Name}
          person2Name={person2Name}
          date={date}
          venue={venue}
          isInteracting={isInteracting}
        />

        {/* Mouse + Touch Interaction */}
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