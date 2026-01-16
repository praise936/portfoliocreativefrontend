import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshWobbleMaterial, MeshDistortMaterial, Environment, Lightformer, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Main 3D Sculpture Component
function Sculpture() {
    const meshRef = useRef();
    const groupRef = useRef();

    // Create a complex geometry (Icosahedron + Dodecahedron hybrid)
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    // Animation
    useFrame((state) => {
        if (meshRef.current) {
            // Slow rotation
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;

            // Subtle pulsing
            meshRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
            meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.05;
            meshRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
        }

        if (groupRef.current) {
            // Slow group rotation
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Main central geometry */}
            <mesh
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setClicked(!clicked)}
                scale={clicked ? 1.2 : 1}
            >
                {/* Complex geometry - combination of shapes */}
                <icosahedronGeometry args={[1.2, 1]} />
                <MeshWobbleMaterial
                    color={hovered ? "#ff00ff" : "#00ffff"}
                    emissive={hovered ? "#ff00ff" : "#00ffff"}
                    emissiveIntensity={0.2}
                    metalness={0.9}
                    roughness={0.1}
                    speed={clicked ? 2 : 0.5}
                    factor={hovered ? 0.2 : 0.1}
                />
            </mesh>

            {/* Outer wireframe */}
            <mesh>
                <icosahedronGeometry args={[1.8, 0]} />
                <meshBasicMaterial
                    color="#ffffff"
                    wireframe={true}
                    transparent={true}
                    opacity={0.3}
                />
            </mesh>

            {/* Orbiting smaller geometries */}
            {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const radius = 2.5;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                return (
                    <Float
                        key={i}
                        speed={2 + i * 0.5}
                        rotationIntensity={1}
                        floatIntensity={2}
                    >
                        <mesh position={[x, Math.sin(Date.now() * 0.001 + i) * 0.5, z]}>
                            {i % 3 === 0 ? (
                                <tetrahedronGeometry args={[0.3, 0]} />
                            ) : i % 3 === 1 ? (
                                <octahedronGeometry args={[0.25, 0]} />
                            ) : (
                                <dodecahedronGeometry args={[0.2, 0]} />
                            )}
                            <meshStandardMaterial
                                color={i % 2 === 0 ? "#ff0066" : "#00ffcc"}
                                emissive={i % 2 === 0 ? "#ff0066" : "#00ffcc"}
                                emissiveIntensity={0.5}
                                metalness={0.8}
                                roughness={0.2}
                            />
                        </mesh>
                    </Float>
                );
            })}

            {/* Floating particles */}
            <Sparkles
                count={50}
                size={2}
                speed={0.1}
                opacity={0.6}
                color="#ffffff"
                scale={4}
            />
        </group>
    );
}

// Scene with lighting
function Scene() {
    return (
        <>
            {/* Lights */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ff00ff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
            <spotLight
                position={[0, 10, 0]}
                angle={0.5}
                penumbra={1}
                intensity={1}
                color="#ffffff"
                castShadow
            />

            {/* Main sculpture */}
            <Sculpture />

            {/* Simple environment */}
            <Environment preset="city" />

            {/* Subtle orbit controls for desktop */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={false} // Disabled for static view, can enable if you want interaction
                autoRotate={true}
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
            />
        </>
    );
}

// Main component
export default function GeometricSculpture() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
            }}
            gl={{
                alpha: true,
                antialias: true,
                powerPreference: "high-performance"
            }}
        >
            <Scene />
        </Canvas>
    );
}