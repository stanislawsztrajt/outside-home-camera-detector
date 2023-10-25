import { useRef, useEffect } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

const predictionsThings = [
  "person",
  "cat",
  "dog",
  "car",
  "bicycle",
  "motorcycle",
  "bus",
  "truck"
]

const useCameraDetector = () => {
  const webcamRef = useRef(null) as any;
  const canvasRef = useRef(null);

  useEffect(() => {
    const runDetection = async () => {
      const net = await cocoSsd.load();
      setInterval(() => {
        detect(net);
      }, 1000);
    };

    runDetection();
  }, []);

  const detect = async (net: any) => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      const video = webcamRef.current.video;
      const canvas = canvasRef.current as any;
      canvas.width = video.width;
      canvas.height = video.height;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, video.width, video.height);

      const predictions = await net.detect(canvas);

      context.clearRect(0, 0, canvas.width, canvas.height);

      predictions.forEach((prediction: any) => {
        if (predictionsThings.includes(prediction.class)) {
          const [x, y, width, height] = prediction.bbox;
          context.beginPath();
          context.rect(x, y, width, height);
          context.lineWidth = 2;
          context.strokeStyle = 'red';
          context.fillStyle = 'red';
          context.stroke();
          context.closePath();
          context.fillText(prediction.class, x, y - 5);
        }
      });
    }
  };

 return {
  webcamRef,
  canvasRef
 }
}

export default useCameraDetector;
