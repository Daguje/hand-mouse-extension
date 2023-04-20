import { Controller } from './lib'

import * as handPoseDetection from "@tensorflow-models/hand-pose-detection"
import * as mediapipeHands from "@mediapipe/hands"

const controller = new Controller({ mediapipeHands, handPoseDetection })

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    (async () => {
        chrome.tabs.sendMessage(tabId, { action: 'UPDATED' }, async (response) => {
            if (!response.camera) {
                console.error('Não foi possível obter informações da camera');
                return;
            }

            console.log(response)
        
            await controller.estimateHands(response.camera)
        })
    })();
})