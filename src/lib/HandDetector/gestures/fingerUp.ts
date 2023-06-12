import * as fp from 'fingerpose'

const fingerUp = new fp.GestureDescription('fingerUp')

fingerUp.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
fingerUp.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 0.9);
fingerUp.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 0.9);


for(const finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  fingerUp.addCurl(finger, fp.FingerCurl.FullCurl, 1.0)
  fingerUp.addCurl(finger, fp.FingerCurl.FullCurl, 0.9)
}

export { fingerUp }