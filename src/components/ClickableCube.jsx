//proof of concept, for testing different sides of cube being interactive
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Edges } from '@react-three/drei'
import { useRef, useState } from 'react'

export default function ClickableCube() {
  const meshRef = useRef()
  const [startPosition, setStartPosition] = useState(null)

  const faceLinks = {
    front: 'https://example.com/front',
    back: 'https://example.com/back',
    top: 'https://example.com/top',
    bottom: 'https://example.com/bottom',
    right: 'https://example.com/right',
    left: 'https://example.com/left'
  }
  //map numbers to links
  const faceMap = {
    0: faceLinks.front,
    2: faceLinks.back,
    4: faceLinks.top,
    6: faceLinks.bottom,
    8: faceLinks.right,
    10: faceLinks.left
  }

  const handlePointerDown = (event) => {
    setStartPosition({ x: event.clientX, y: event.clientY })
  }

  const handlePointerUp = (event) => {
    const endX = event.clientX
    const endY = event.clientY

    // Check movement threshold
    if (
      startPosition &&
      Math.abs(endX - startPosition.x) < 5 &&
      Math.abs(endY - startPosition.y) < 5
    ) {
      //identify which face is clicked
      const faceIndex = event.faceIndex
      const faceKey = faceIndex - (faceIndex % 2)

      if (faceMap[faceKey]) {
        window.open(faceMap[faceKey], '_blank')
      }
    }

    setStartPosition(null)
  }

  return (
    <Canvas camera={{ position: [4, 4, 4], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} />
      <OrbitControls />

      <mesh
        ref={meshRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="skyblue" />
        <Edges scale={1.01} color="black" />
      </mesh>

      {/* Face Numbers */}
      <Text position={[0, 0, 1.1]} fontSize={0.3} color="black">1</Text>
      <Text position={[0, 0, -1.1]} rotation={[0, Math.PI, 0]} fontSize={0.3} color="black">2</Text>
      <Text position={[0, 1.1, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.3} color="black">3</Text>
      <Text position={[0, -1.1, 0]} rotation={[Math.PI / 2, 0, 0]} fontSize={0.3} color="black">4</Text>
      <Text position={[1.1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} fontSize={0.3} color="black">5</Text>
      <Text position={[-1.1, 0, 0]} rotation={[0, Math.PI / 2, 0]} fontSize={0.3} color="black">6</Text>
    </Canvas>
  )
}
