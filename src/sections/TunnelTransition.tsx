import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const ROWS = 10
const COLS = 10
const IMAGE_SIZE = 1.0
const GAP = 0.1
const TOTAL_HEIGHT = ROWS * (IMAGE_SIZE + GAP)

function TunnelGrid({ velocityRef }: { velocityRef: React.RefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const { camera } = useThree()

  // Load texture
  const texture = useMemo(() => {
    const tex = new THREE.TextureLoader().load('/images/tunnel-texture.jpg')
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    return tex
  }, [])

  // Create shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uScrollSpeed: { value: 0 },
        uTime: { value: 0 },
      },
      vertexShader: `
        uniform float uScrollSpeed;
        uniform float uTime;
        varying vec2 vUv;
        varying float vZ;

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Sample texture for elevation
          float elevation = texture2D(uTexture, uv).r;
          pos.z += elevation * uScrollSpeed * 0.3;

          // Add subtle wave
          pos.z += sin(pos.x * 3.0 + uTime) * 0.02 * abs(uScrollSpeed);

          vZ = pos.z;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uScrollSpeed;
        varying vec2 vUv;
        varying float vZ;

        void main() {
          vec4 texColor = texture2D(uTexture, vUv);

          // Cyan tint based on scroll speed
          float cyanMix = smoothstep(0.0, 0.3, abs(uScrollSpeed));
          vec3 cyanColor = vec3(0.0, 1.0, 0.953);
          vec3 finalColor = mix(texColor.rgb * 0.6, cyanColor, cyanMix * 0.4);

          // Depth fade
          float depthFade = 1.0 - smoothstep(0.0, 3.0, abs(vZ));

          gl_FragColor = vec4(finalColor, texColor.a * 0.7 * depthFade);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })
  }, [texture])

  // Set up instanced mesh positions
  useEffect(() => {
    if (!meshRef.current) return
    const dummy = new THREE.Object3D()
    let idx = 0
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const angle = (col / COLS) * Math.PI * 2
        const radius = 3 + (row / ROWS) * 0.5
        const y = row * (IMAGE_SIZE + GAP) - TOTAL_HEIGHT / 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        dummy.position.set(x, y, z)
        dummy.rotation.set(0, -angle + Math.PI / 2, 0)
        dummy.scale.set(IMAGE_SIZE, IMAGE_SIZE, 1)
        dummy.updateMatrix()
        meshRef.current.setMatrixAt(idx, dummy.matrix)
        idx++
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current || !meshRef.current) return

    // Smooth velocity
    const targetVel = velocityRef.current || 0
    const currentVel = shaderMaterial.uniforms.uScrollSpeed.value
    shaderMaterial.uniforms.uScrollSpeed.value +=
      (targetVel - currentVel) * 0.1
    shaderMaterial.uniforms.uTime.value += delta

    // Move group down
    groupRef.current.position.y -= targetVel * delta * 0.5

    // Wrap around
    groupRef.current.position.y =
      ((groupRef.current.position.y % TOTAL_HEIGHT) + TOTAL_HEIGHT) %
      TOTAL_HEIGHT -
      TOTAL_HEIGHT / 2
  })

  useEffect(() => {
    camera.position.set(0, 0, 0)
    camera.lookAt(0, -5, 0)
  }, [camera])

  return (
    <group ref={groupRef}>
      {/* Two point lights on sides */}
      <pointLight position={[-4, 0, 0]} color="#00FFF3" intensity={1.5} />
      <pointLight position={[4, 0, 0]} color="#007A7A" intensity={1.5} />

      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, ROWS * COLS]}
        material={shaderMaterial}
      >
        <planeGeometry args={[1, 1, 16, 16]} />
      </instancedMesh>
    </group>
  )
}

export default function TunnelTransition() {
  const containerRef = useRef<HTMLDivElement>(null)
  const velocityRef = useRef(0)
  const hintRef = useRef<HTMLDivElement>(null)
  const hiddenRef = useRef(false)

  useEffect(() => {
    let lastScroll = window.scrollY

    const handleScroll = () => {
      const currentScroll = window.scrollY
      velocityRef.current = (currentScroll - lastScroll) * 0.01
      lastScroll = currentScroll

      // Hide hint when scrolling fast
      if (Math.abs(velocityRef.current) > 0.5 && hintRef.current && !hiddenRef.current) {
        hiddenRef.current = true
        hintRef.current.style.transition = 'opacity 0.3s ease'
        hintRef.current.style.opacity = '0'
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      id="tunnel-transition"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#000000',
      }}
    >
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        camera={{ position: [0, 0, 0], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000')
        }}
      >
        <TunnelGrid velocityRef={velocityRef} />
      </Canvas>

      {/* Scroll hint */}
      <div
        ref={hintRef}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: '#444444',
          zIndex: 2,
        }}
      >
        继续滚动，探索更多
      </div>
    </div>
  )
}
