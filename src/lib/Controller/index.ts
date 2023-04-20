import { Camera } from  '..'


export class Controller {
    camera: Camera
    handPoseDetection: any
    mediapipeHands: any

    constructor({ mediapipeHands, handPoseDetection }: any){
        this.camera = {} as Camera
        this.mediapipeHands = mediapipeHands
        this.handPoseDetection = handPoseDetection
    }

    async estimateHands(camera: Camera) {
        this.camera = camera
        console.log({ camera })
        
        const model = this.handPoseDetection.SupportedModels.MediaPipeHands;

        const detector = await this.handPoseDetection.createDetector(model, {
            runtime: 'mediapipe',
            modelType: 'full',
            maxHands: 2,
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${this.mediapipeHands.VERSION}`
        });

        const hands = await detector.estimateHands(this.camera.video, { flipHorizontal: true })

        console.log({ hands })
    }
}