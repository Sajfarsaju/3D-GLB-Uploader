import { useGLTF } from '@react-three/drei';
import FallbackUI from './FallbackUI';

function Model({ glbUrl }) {
  
  const { scene , error} = useGLTF(glbUrl);

  if (error) {
    return <FallbackUI />;
  }

  return (
    <primitive
      object={scene}
      dispose={null}
      castShadow
      receiveShadow
     position={[0, -0.6, 0]}
    />
  );
}
export default Model