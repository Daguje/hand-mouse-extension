import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import * as mediapipeHands from "@mediapipe/hands";
import { Hand } from '@tensorflow-models/hand-pose-detection';
import { PixelInput } from "@tensorflow-models/hand-pose-detection/dist/shared/calculators/interfaces/common_interfaces";
import { estimateGesture } from "./utils";

export class HandDector {
    detector: handPoseDetection.HandDetector

    static async create(): Promise<HandDector> {
        const detector = new HandDector()
        await detector.setup()

        return detector
    }

    async setup() {
        try {
            this.detector = await HandDector.createDetector()
        } catch (err) {
            throw new Error(`Houve um erro ao criar o detector de mãos: ${err}`)
        }
    }

    static async createDetector(): Promise<handPoseDetection.HandDetector> {
        const model = handPoseDetection.SupportedModels.MediaPipeHands
        const detector = await handPoseDetection.createDetector(model, {
            runtime: 'mediapipe',
            modelType: 'lite',
            maxHands: 2,
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mediapipeHands.VERSION}`
        })
        return detector
    }

    async estimateHands(video: PixelInput) {
        const detector = this.detector

        let hands: Array<Hand> = []

        try {
            hands = await detector.estimateHands(video, { flipHorizontal: true })
            if (hands.length > 0) {
              const estimatedGestures = await estimateGesture(hands)
              for (let i = 0; i < estimatedGestures.length; i++) {
                if (estimatedGestures[i].name === 'thumbs_up' && estimatedGestures[i].score > 9) {
                  console.log('Thumbs up!')
                }
                else if (estimatedGestures[i].name === 'victory' && estimatedGestures[i].score > 9) {
                  console.log('victory!')
                }
                else if (estimatedGestures[i].name === 'thumbs_down' && estimatedGestures[i].score > 9) {
                  console.log('thumbs down!')
                }
                else if (estimatedGestures[i].name === 'faz_o_L' && estimatedGestures[i].score > 9) {
                  console.log('faz o L!')
                }
              }
            }
            return hands
        } catch (err) {
            detector.dispose()
            this.detector = undefined
            throw new Error(`Houve um erro ao detectar as mãos: ${err}`)
        }
    }
}
