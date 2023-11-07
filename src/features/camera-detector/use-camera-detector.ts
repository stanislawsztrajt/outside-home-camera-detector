import { useRef, useEffect } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { TIMEOUT } from '../../utils/constants/timeout';
import { predictionsThings } from '../../utils/constants/predictions';
import { PredictionQueue } from './camera-detector.types';

const useCameraDetector = () => {
  const webcamRef = useRef(null) as any;
  const canvasRef = useRef(null);

  useEffect(() => {
    Notification.requestPermission()

    const runDetection = async () => {
      const net = await cocoSsd.load();
      const predictionsQueue: PredictionQueue[] = []
      setInterval(() => {
        detect(net, predictionsQueue);
      }, 1000);
    };

    runDetection();
  }, []);


  const detect = async (net: any, predictionsQueue: PredictionQueue[]) => {
    if (webcamRef.current) {
      // const image = webcamRef.current.getScreenshot();
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
          if (!predictionsQueue.some(pred => pred.name === prediction.class)) {
            const newPrediction: PredictionQueue = {
              name: prediction.class,
              timeout: TIMEOUT
            }

            new Notification(`${prediction.class} was detected on camera.`)
            predictionsQueue.push(newPrediction)

            setTimeout(() => {
              const predictionIndex = predictionsQueue.findIndex(pred => pred.name === prediction.class)
              predictionsQueue.splice(predictionIndex, 1)
            }, TIMEOUT)
          }

          const [x, y, width, height] = prediction.bbox;
          context.beginPath();
          context.rect(x, y, width, height);
          context.lineWidth = 2;
          context.strokeStyle = 'red';
          context.fillStyle = 'red';
          context.stroke();
          context.closePath();
          context.fillText(prediction.class.toUpperCase(), x, y - 5);
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
