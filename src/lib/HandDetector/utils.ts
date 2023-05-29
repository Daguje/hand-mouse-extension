import * as fp from "fingerpose";
import { Keypoint } from '@tensorflow-models/hand-pose-detection';
import { closedHandGesture, okGesture, victoryGesture } from './gestures/index';

function convertToFingerpose(keypoints: Array<Keypoint>): number[][] {
  const vetor: number[][] = [];
  for (let i = 0; i < keypoints.length; i++) {
    const x = keypoints[i].x
    const y = keypoints[i].y
    const z = 0;
    vetor[i] = [x, y, z];
  }
  return vetor;
}

export function estimateGesture(keypoints: Array<Keypoint>) {
  const GE = new fp.GestureEstimator([
    closedHandGesture,
    okGesture,
    victoryGesture
  ])
  
  const examplePrediction = convertToFingerpose(keypoints)                       
  const estimatedGestures = GE.estimate(examplePrediction, 9)
  return estimatedGestures.gestures
}