import { GesturesDef } from '@gestures/types';
import * as fp from 'fingerpose'

const okGesture = new fp.GestureDescription(GesturesDef.Click)
okGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
okGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1);

okGesture.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 1.0);
okGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 1);

for(const finger of [fp.Finger.Ring, fp.Finger.Middle, fp.Finger.Pinky]) {
  okGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0)
  okGesture.addCurl(finger, fp.FingerCurl.NoCurl, 0.9)
}

export { okGesture }