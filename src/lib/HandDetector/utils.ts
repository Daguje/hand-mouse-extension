import * as fp from "fingerpose";
import { Hand } from '@tensorflow-models/hand-pose-detection';
import { closedHandGesture, okGesture, victoryGesture } from './gestures/index';

function convertToFingerpose(hand: Array<Hand>): number[][] {
  const vetor: number[][] = [];
  for (let i = 0; i < hand[0].keypoints.length; i++) {
    const x = hand[0].keypoints[i]['x'];
    const y = hand[0].keypoints[i]['y'];
    const z = 0;
    vetor[i] = [x, y, z];
  }
  return vetor;
}

export async function estimateGesture(hands: Array<Hand>) {
  const GE = new fp.GestureEstimator([
    closedHandGesture,
    okGesture,
    victoryGesture
  ])
  const examplePrediction = await convertToFingerpose(hands)                       
  const estimatedGestures = GE.estimate(examplePrediction, 9)
  return estimatedGestures.gestures
}

export async function verifyGesture(hands: Array<Hand>) {
  const estimatedGestures = await estimateGesture(hands)
  for (let i = 0; i < estimatedGestures.length; i++) {
    if (estimatedGestures[i].name === 'closedHandGesture' && estimatedGestures[i].score > 9) {
      return 'Closed Hand!'
    }
    else if (estimatedGestures[i].name === 'okGesture' && estimatedGestures[i].score > 9) {
      return 'Ok!'
    }
    else if (estimatedGestures[i].name === 'victoryGesture' && estimatedGestures[i].score > 9) {
      return 'Victory!'
    }
  }
}