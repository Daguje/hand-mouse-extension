import * as fp from 'fingerpose'

const closedHandGesture = new fp.GestureDescription('closedHandGesture')

for(const finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  closedHandGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0)
  closedHandGesture.addCurl(finger, fp.FingerCurl.FullCurl, 0.9)
}

export { closedHandGesture }