//proof of concept, for testing different sides of cube being interactive
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Edges } from '@react-three/drei'
import { useRef } from 'react'

export default function ClickableCube() {
  const meshRef = useRef()

  const faceLinks = {
    front: 'https://example.com/front',
    back: 'https://example.com/back',
    top: 'https://example.com/top',
    bottom: 'https://example.com/bottom',
    right: 'https://example.com/right',
    left: 'https://example.com/left'
  }

  const handlePointerDown = (event) => {
    //identify which face is clicked
    const faceIndex = event.faceIndex
    const faceKey = faceIndex - (faceIndex % 2)
    
    //map numbers to links
    const faceMap = {
      0: faceLinks.front,
      2: faceLinks.back,
      4: faceLinks.top,
      6: faceLinks.bottom,
      8: faceLinks.right,
      10: faceLinks.left
    }

    if (faceMap[faceKey]) {
      window.open(faceMap[faceKey], '_blank')
    }
  }

  return (
    <Canvas camera={{ position: [4, 4, 4], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} />
      <OrbitControls />

      <mesh ref={meshRef} onPointerDown={handlePointerDown}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="skyblue" />
        <Edges scale={1.01} color="black" /> {/* Outline edges */}
      </mesh>

      {/* Numbers on each face */}
      <Text position={[0, 0, 1.1]} fontSize={0.3} color="black">1</Text> {/* Front */}
      <Text position={[0, 0, -1.1]} rotation={[0, Math.PI, 0]} fontSize={0.3} color="black">2</Text> {/* Back */}
      <Text position={[0, 1.1, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.3} color="black">3</Text> {/* Top */}
      <Text position={[0, -1.1, 0]} rotation={[Math.PI / 2, 0, 0]} fontSize={0.3} color="black">4</Text> {/* Bottom */}
      <Text position={[1.1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} fontSize={0.3} color="black">5</Text> {/* Right */}
      <Text position={[-1.1, 0, 0]} rotation={[0, Math.PI / 2, 0]} fontSize={0.3} color="black">6</Text> {/* Left */}
    </Canvas>
  )
}