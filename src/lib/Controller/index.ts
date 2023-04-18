import * as handPoseDetection from "@tensorflow-models/hand-pose-detection"
import * as mediapipeHands from "@mediapipe/hands"

import { Camera } from  '..'

export class Controller {
    camera: Camera

    constructor(){
        this.camera = {} as Camera
    }

    async estimateHands(camera: Camera, url: string, tabId: number) {
        this.camera = camera
        
        const model = handPoseDetection.SupportedModels.MediaPipeHands;

        const detector = await handPoseDetection.createDetector(model, {
            runtime: 'mediapipe',
            modelType: 'full',
            maxHands: 2,
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mediapipeHands.VERSION}`
        });

        const hands = await detector.estimateHands(this.camera.video, { flipHorizontal: true })

        const message = { action: 'HANDS_PREDICTED', url, hands }
        chrome.tabs.sendMessage(tabId, message)
    }
}