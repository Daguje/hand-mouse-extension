
// import "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@4.2.0/dist/tf-core.min.js"
// import "https://unpkg.com/@tensorflow/tfjs-backend-webgl@3.7.0/dist/tf-backend-webgl.min.js"
// import "https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/hands.min.js"
// import "https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection@2.0.0/dist/hand-pose-detection.min.js"

import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';

tfjsWasm.setWasmPaths(
    `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${
        tfjsWasm.version_wasm}/dist/`);

import * as handPoseDetection from "@tensorflow-models/hand-pose-detection"
import * as mediapipeHands from "@mediapipe/hands"

class Controller {
    async estimateHands(video: any) {
        const model = handPoseDetection.SupportedModels.MediaPipeHands;

        const detector = await handPoseDetection.createDetector(model, {
            runtime: 'mediapipe',
            modelType: 'full',
            maxHands: 2,
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mediapipeHands.VERSION}`
        });

        const hands = await detector.estimateHands(video, { flipHorizontal: true })

        console.log({ hands })
    }
}

const controller = new Controller()

const importedScripts: string[] = [];

const tryImportScripts = (...fileNames: string[]) => {
    try {
        const toRun = new Set(fileNames.filter(f => !importedScripts.includes(f)))
        if (toRun.size) {
            toRun.forEach(run => importedScripts.push(run))
            importScripts(...importedScripts)
        }
        return true
      } catch (e) {
        console.error(e);
        return false
      }
}

chrome.runtime.onInstalled.addListener(() => {
    if(tryImportScripts(
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mediapipeHands.VERSION}`,
    )) {
        return true
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    (async () => {
        console.log({self})
        chrome.tabs.sendMessage(tabId, { action: 'UPDATED' }, async (response) => {
            if (!response.video) {
                console.error('Não foi possível obter informações da camera');
            }

            // console.log(response.video)
        
            await controller.estimateHands(response.video)
        })
    })();
})