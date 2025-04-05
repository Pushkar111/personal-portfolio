
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei';

const PhoneModel = () => {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        {/* A simple phone representation using primitive shapes */}
        <group position={[0, -0.5, 0]} rotation={[0, Math.PI / 5, 0]}>
          {/* Phone body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1, 2, 0.1]} />
            <meshStandardMaterial color="#2A2A72" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Phone screen */}
          <mesh position={[0, 0, 0.06]}>
            <boxGeometry args={[0.9, 1.9, 0.01]} />
            <meshStandardMaterial color="black" metalness={0.5} roughness={0.2} />
          </mesh>
          
          {/* Camera bump */}
          <mesh position={[0.3, 0.8, 0.06]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.03, 32]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          
          {/* Home button */}
          <mesh position={[0, -1.8, 0.06]}>
            <cylinderGeometry args={[0.1, 0.1, 0.01, 32]} />
            <meshStandardMaterial color="#444" />
          </mesh>
        </group>
        
        <ContactShadows rotation-x={Math.PI / 2} position={[0, -2, 0]} opacity={0.25} width={10} height={10} blur={1.5} far={2} />
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2.5}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Suspense>
    </Canvas>
  );
};

export default PhoneModel;
