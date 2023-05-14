import * as fp from "fingerpose";
import { Hand } from '@tensorflow-models/hand-pose-detection';

export function convertToFingerpose(hand: Array<Hand>): number[][] {
  const vetor: number[][] = [];
  for (let i = 0; i < hand[0].keypoints.length; i++) {
    const x = hand[0].keypoints[i]['x'];
    const y = hand[0].keypoints[i]['y'];
    const z = 0;
    vetor[i] = [x, y, z];
  }
  return vetor;
}

export function estimateGesture(hands: Array<Hand>) {
  const GE = new fp.GestureEstimator([
    fp.Gestures.VictoryGesture,
    fp.Gestures.ThumbsUpGesture
  ]);
  const examplePrediction = this.convertToFingerpose(hands)                             
  const estimatedGestures = GE.estimate(examplePrediction, 5)
  return estimatedGestures
}
