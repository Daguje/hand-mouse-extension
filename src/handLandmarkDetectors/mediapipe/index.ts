import {
    FilesetResolver,
    HandLandmarker,
    HandLandmarkerResult,
    ImageSource,
} from "@mediapipe/tasks-vision";
import { staticImplements } from '../../utils/staticImplements'
import { IStaticHandLandmarkDetector } from "../types";
  
@staticImplements<IStaticHandLandmarkDetector>()
export class MediaPipeHandDetector {
    private detector: HandLandmarker

    static async create() {
        const detector = new MediaPipeHandDetector();
        await detector.setup();

        return detector;
    }

    async setup() {
        try {
            console.log('Iniciando Detector MediaPipe')
            this.detector = await MediaPipeHandDetector.createDetector();
            console.log('Dectector MediaPipe inicializado')
        } catch (err) {
            throw new Error(`Houve um erro ao criar o detector de mãos: ${err}`);
        }
    }

    getHandCenter(hand: unknown) {
        return {
            x: 0,
            y: 0
        }
    }

    static async createDetector() {
        const vision = await FilesetResolver.forVisionTasks("tasks-vision@0.10");

        FilesetResolver.forVisionTasks

        const detector = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: 'hand_landmarker.task',
                delegate: "GPU",
            },
            runningMode: "VIDEO",
            numHands: 2
        });

        return detector
    }

    async estimateHands(img: ImageSource) {
        const detector = this.detector;

        let hands: HandLandmarkerResult = {} as HandLandmarkerResult;

        try {
            hands = detector.detect(img);

            return hands;
        } catch (err) {
            throw new Error(`Houve um erro ao detectar as mãos: ${err}`);
        }
    }
}