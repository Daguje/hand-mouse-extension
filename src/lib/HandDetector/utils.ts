import * as fp from "fingerpose";
import { Hand, Keypoint } from '@tensorflow-models/hand-pose-detection';

// definindo gestos

// -- thumbs down
const thumbsDownGesture = new fp.GestureDescription('thumbs_down')
thumbsDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0)
// Como esse é pra baixo, precisa indicar a direção
thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 1.0)
thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownLeft, 0.9);
thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownRight, 0.9);
for(const finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  thumbsDownGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0)
  thumbsDownGesture.addCurl(finger, fp.FingerCurl.FullCurl, 0.9)
}

// -- faz o L
const fazOLGesture = new fp.GestureDescription('faz_o_L')
fazOLGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0)
fazOLGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0)

for(const finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  fazOLGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0)
  fazOLGesture.addCurl(finger, fp.FingerCurl.FullCurl, 0.9)
}

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
    fp.Gestures.VictoryGesture,
    fp.Gestures.ThumbsUpGesture,
    thumbsDownGesture,
    fazOLGesture
  ])
  
  const examplePrediction = convertToFingerpose(keypoints)                       
  const estimatedGestures = GE.estimate(examplePrediction, 5)
  return estimatedGestures.gestures
}
