import Webcam from 'react-webcam';
import useCameraDetector from './use-camera-detector';

export default function CameraDetector() {
  const { canvasRef, webcamRef } = useCameraDetector()

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Webcam ref={webcamRef} width="640" height="480" />
      <canvas style={{ position: 'absolute' }} ref={canvasRef} id="myCanvas" width="640" height="480"></canvas>
    </div>
  );
}