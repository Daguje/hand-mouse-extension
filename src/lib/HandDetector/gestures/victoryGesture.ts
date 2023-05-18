import * as fp from 'fingerpose'

const victoryGesture = new fp.GestureDescription('victoryGesture')

victoryGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
victoryGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 0.9);
victoryGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 0.9);
victoryGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 0.9);

victoryGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
victoryGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 0.9);

for(const finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
  victoryGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0)
  victoryGesture.addCurl(finger, fp.FingerCurl.FullCurl, 0.9)
}

export default victoryGesture