'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Helper function to create text texture
const createTextTexture = (text: string, subtitle: string, color: string) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!
  
  // Set canvas size for high resolution
  canvas.width = 1024
  canvas.height = 512
  
  // Clear canvas with dark background
  context.fillStyle = 'rgba(0, 0, 0, 0.8)'
  context.fillRect(0, 0, canvas.width, canvas.height)
  
  // Add subtle gradient background
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
  gradient.addColorStop(0, 'rgba(10, 10, 10, 0.9)')
  gradient.addColorStop(1, 'rgba(30, 30, 30, 0.8)')
  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)
  
  // Set text properties
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  
  // Main title with glow effect
  context.font = 'bold 48px "Orbitron", "Arial Black", sans-serif'
  context.fillStyle = color
  context.shadowColor = color
  context.shadowBlur = 20
  context.strokeStyle = color
  context.lineWidth = 2
  
  // Draw title with stroke and fill for better visibility
  const titleY = canvas.height / 2 - 30
  context.strokeText(text, canvas.width / 2, titleY)
  context.fillText(text, canvas.width / 2, titleY)
  
  // Subtitle with less glow
  context.font = 'normal 24px "JetBrains Mono", "Courier New", monospace'
  context.fillStyle = '#cccccc'
  context.shadowBlur = 10
  context.shadowColor = '#888888'
  context.lineWidth = 1
  context.strokeStyle = '#888888'
  
  const subtitleY = canvas.height / 2 + 40
  context.strokeText(subtitle, canvas.width / 2, subtitleY)
  context.fillText(subtitle, canvas.width / 2, subtitleY)
  
  // Create texture
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  
  return texture
}

interface Folder3DProps {
  position: [number, number, number]
  title: string
  subtitle: string
  color: string
  isSelected: boolean
  isHovered: boolean
  onClick: () => void
  onPointerEnter: () => void
  onPointerLeave: () => void
}

export default function Folder3D({
  position,
  title,
  subtitle,
  color,
  isSelected,
  isHovered,
  onClick,
  onPointerEnter,
  onPointerLeave
}: Folder3DProps) {
  const meshRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Get color value
  const getColor = (colorName: string) => {
    switch (colorName) {
      case 'cyber-primary': return '#00ff41'
      case 'cyber-accent': return '#00d4ff'
      case 'cyber-secondary': return '#ff0080'
      default: return '#00ff41'
    }
  }

  const folderColor = getColor(color)

  // Create text texture using useMemo for performance
  const textTexture = useMemo(() => {
    return createTextTexture(title, subtitle, folderColor)
  }, [title, subtitle, folderColor])

  // Animation loop
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.02
      
      // Hover effects with smooth transitions
      if (isHovered || hovered) {
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, position[2] + 0.8, 0.1)
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -0.05, 0.1)
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0.02, 0.1)
      } else {
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, position[2], 0.1)
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1)
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1)
      }
      
      // Selected effects
      if (isSelected) {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1.05, 0.1))
      } else {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1))
      }
    }

    // Glow animation
    if (glowRef.current && glowRef.current.material instanceof THREE.MeshBasicMaterial) {
      const intensity = isSelected ? 0.8 : (isHovered || hovered) ? 0.6 : 0.3
      glowRef.current.material.opacity = THREE.MathUtils.lerp(glowRef.current.material.opacity, intensity, 0.1)
    }
  })

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerEnter={() => {
        setHovered(true)
        onPointerEnter()
      }}
      onPointerLeave={() => {
        setHovered(false)
        onPointerLeave()
      }}
    >
      {/* Main folder body with premium materials */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 3, 0.15]} />
        <meshPhysicalMaterial
          color={"#0a0a0a"}
          emissive={folderColor}
          emissiveIntensity={isSelected ? 0.4 : 0.2}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.05}
          thickness={0.5}
        />
      </mesh>

      {/* Folder tab with enhanced geometry */}
      <mesh position={[-1.2, 1.6, 0.08]} castShadow>
        <boxGeometry args={[1.8, 0.5, 0.2]} />
        <meshPhysicalMaterial
          color={"#0f0f0f"}
          emissive={folderColor}
          emissiveIntensity={0.5}
          metalness={0.95}
          roughness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Text overlay plane */}
      <mesh position={[0, 0, 0.12]} rotation={[0, 0, 0]}>
        <planeGeometry args={[4.0, 2.6]} />
        <meshBasicMaterial
          map={textTexture}
          transparent
          alphaTest={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Premium holographic glow outline */}
      <mesh ref={glowRef} position={[0, 0, -0.02]}>
        <planeGeometry args={[4.8, 3.3]} />
        <meshBasicMaterial
          color={folderColor}
          transparent
          opacity={isHovered ? 0.4 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Advanced holographic scan lines */}
      {(isHovered || isSelected) && (
        <group>
          {Array.from({ length: 15 }).map((_, i) => (
            <mesh
              key={i}
              position={[0, -1.3 + (i * 0.18), 0.1]}
              rotation={[0, 0, Math.sin(i * 0.3) * 0.02]}
            >
              <planeGeometry args={[4.3, 0.015]} />
              <meshBasicMaterial
                color={folderColor}
                transparent
                opacity={0.8 - (i * 0.04)}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Corner accent lights */}
      <group>
        {/* Top-left corner */}
        <mesh position={[-2.1, 1.4, 0.12]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial
            color={folderColor}
            transparent
            opacity={isSelected ? 1 : 0.7}
          />
        </mesh>
        {/* Top-right corner */}
        <mesh position={[2.1, 1.4, 0.12]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial
            color={folderColor}
            transparent
            opacity={isSelected ? 1 : 0.7}
          />
        </mesh>
        {/* Bottom-left corner */}
        <mesh position={[-2.1, -1.4, 0.12]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial
            color={folderColor}
            transparent
            opacity={isSelected ? 1 : 0.7}
          />
        </mesh>
        {/* Bottom-right corner */}
        <mesh position={[2.1, -1.4, 0.12]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial
            color={folderColor}
            transparent
            opacity={isSelected ? 1 : 0.7}
          />
        </mesh>
      </group>

      {/* Edge highlighting */}
      <group>
        {/* Top edge */}
        <mesh position={[0, 1.5, 0.08]}>
          <boxGeometry args={[4.6, 0.02, 0.02]} />
          <meshBasicMaterial
            color={folderColor}
            transparent
            opacity={isHovered ? 0.9 : 0.6}
          />
        </mesh>
        {/* Bottom edge */}
        <mesh position={[0, -1.5, 0.08]}>
          <boxGeometry args={[4.6, 0.02, 0.02]} />
          <meshBasicMaterial
            color={folderColor}
            transparent
            opacity={isHovered ? 0.9 : 0.6}
          />
        </mesh>
        {/* Left edge */}
        <mesh position={[-2.25, 0, 0.08]}>
          <boxGeometry args={[0.02, 3.02, 0.02]} />
          <meshBasicMaterial
            color={folderColor}
            transparent
            opacity={isHovered ? 0.9 : 0.6}
          />
        </mesh>
        {/* Right edge */}
        <mesh position={[2.25, 0, 0.08]}>
          <boxGeometry args={[0.02, 3.02, 0.02]} />
          <meshBasicMaterial
            color={folderColor}
            transparent
            opacity={isHovered ? 0.9 : 0.6}
          />
        </mesh>
      </group>
    </group>
  )
}