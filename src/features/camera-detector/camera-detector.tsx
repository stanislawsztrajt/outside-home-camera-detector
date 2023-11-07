import Webcam from 'react-webcam';
import useCameraDetector from './use-camera-detector';
import { predictionsThings } from '../../utils/constants/predictions';

export default function CameraDetector() {
  const { canvasRef, webcamRef } = useCameraDetector()

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          position: 'absolute',
          top: '0',
          display: 'flex',
          gap: 4
        }}
      >
        <div style={{ marginRight: 10 }}>
          List of predictions: 
        </div>
        { predictionsThings.map(prediction => (
          <div key={prediction}>
            {prediction},{" "}
          </div>
        )) }
      </div>
      <Webcam 
        ref={webcamRef}  
        width={960}
        height={720}
      />
      <canvas 
        style={{ position: 'absolute' }} 
        ref={canvasRef} 
        width={960}
        height={720}
      >
      </canvas>
    </div>
  );
}