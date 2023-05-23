import { PixelInput } from '@tensorflow-models/hand-pose-detection/dist/shared/calculators/interfaces/common_interfaces';
import { Camera, HandDector, View } from '../../lib';

let video: PixelInput;
let handDetector: HandDector;
let view: View;

const results = async () => {
  const hands = await handDetector.estimateHands(video);
  view.drawHands(hands);

  requestAnimationFrame(results);
};

const app = async () => {
  video = await Camera.create();
  handDetector = await HandDector.create();
  view = new View(video);

  Camera.draw(video);

  results();
};

app();
