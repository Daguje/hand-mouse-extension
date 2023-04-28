import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import { PixelInput } from '@tensorflow-models/hand-pose-detection/dist/shared/calculators/interfaces/common_interfaces';

const model = handPoseDetection.SupportedModels.MediaPipeHands;

async function startDetector(video: PixelInput) {
  const detector = await handPoseDetection.createDetector(model, {
    runtime: 'mediapipe', // or 'tfjs'
    modelType: 'full',
    solutionPath: '/hands',
  });
  const hands = await detector.estimateHands(video);
  console.log({ hands });
}

// function getTabId() {
//   chrome.tabs.getCurrent((tab) => {
//     if (tab) {
//       return tab.id;
//     }
//     return 0;
//   });
//   return 0;
// }
// chrome.scripting.executeScript({
//   target: { tabId: getTabId() },
//   func: startDetector,
// });
const startCamera = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: globalThis.screen.availWidth,
      height: globalThis.screen.availHeight,
      frameRate: {
        ideal: 60,
      },
    },
  });
  return stream;
};
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log({ tabId, changeInfo, tab });

  chrome.tabs.sendMessage(
    tabId,
    { status: 'requestVideo' },
    async (response) => {
      console.log({ response });
      if (!response.video) return;
      await startDetector(response.video);
    },
  );

  chrome.tabs.sendMessage(
    tabId,
    { status: 'requestCamera' },
    async (response) => {
      console.log({ response });
    },
  );

  return true;
});

// tu nao consegue mandar html do contebt script pro service
// toda msg que tu manda da sendmassege doservice worker pro content script pro service worker
