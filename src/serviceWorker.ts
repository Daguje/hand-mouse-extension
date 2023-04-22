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

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    (async () => {
        chrome.tabs.sendMessage(tabId, { action: 'UPDATED' }, async (response) => {
            if (!response.video) {
                console.error('Não foi possível obter informações da camera');
            }

            console.log(response.video)
        
            await controller.estimateHands(response.video)
        })
    })();
})