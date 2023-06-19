import * as fp from 'fingerpose'

const fingerDown = new fp.GestureDescription('fingerDown')

fingerDown.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
fingerDown.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 0.9);
fingerDown.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalDown, 1.0);
fingerDown.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalDown, 0.9);


for(const finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  fingerDown.addCurl(finger, fp.FingerCurl.FullCurl, 1.0)
  fingerDown.addCurl(finger, fp.FingerCurl.FullCurl, 0.9)
}

export { fingerDown }