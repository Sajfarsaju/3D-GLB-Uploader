import { Suspense } from 'react';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Model from './Model'
// import ErrorBoundary from './ErrorBoundary'
import { ErrorBoundary } from 'react-error-boundary';
import FallbackUI from './FallbackUI';

const ModelViewer = ({ glbUrl }) => {
  
  return (
    <div className='w-full rounded-md md:w-96 h-80 bg-gradient-to-br from-blue-200 via-sky-100 to-purple-200'>
      <ErrorBoundary FallbackUI={FallbackUI}>
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }} >
      <ambientLight intensity={0.1} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={0.6}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.1} />
      <OrbitControls
        enableDamping
        dampingFactor={0.1}
        rotateSpeed={0.5}
      />
      <Suspense fallback={null}>
        <Model glbUrl={glbUrl} />
        <Environment preset="sunset" background={false} />
      </Suspense>
    </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default ModelViewer;
