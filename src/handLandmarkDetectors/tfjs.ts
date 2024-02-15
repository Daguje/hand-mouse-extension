import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-backend-webgl'
import { Hand } from '@tensorflow-models/hand-pose-detection';
import { PixelInput } from '@tensorflow-models/hand-pose-detection/dist/shared/calculators/interfaces/common_interfaces';
import { staticImplements } from '@utils/staticImplements';
import { IStaticHandLandmarkDetector } from './types';
import { Point } from '../types';

@staticImplements<IStaticHandLandmarkDetector>()
export class TFJSHandDector {
  private detector: handPoseDetection.HandDetector;

  static async create() {
    const detector = new TFJSHandDector();
    await detector.setup();

    return detector;
  }

  async setup() {
    try {
      console.log('Iniciando Detector TFJS')
      this.detector = await TFJSHandDector.createDetector();
      console.log('Dectector TFJS inicializado')
    } catch (err) {
      throw new Error(`Houve um erro ao criar o detector de mãos TFJS: ${err}`);
    }
  }

  static async createDetector() {
    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    const detector = await handPoseDetection.createDetector(model, {
      runtime: 'tfjs',
      modelType: 'lite',
      maxHands: 1,
    });

    return detector;
  }

  getHandCenter(hands: Array<Hand>) {
    if(!hands.length) return null

    const hand = hands[0]
    if(!hand.keypoints) return null

    const keypoints = hand.keypoints

    const wrist = keypoints[0]
    const indexFingerMCP = keypoints[5]
    const middleFingerMCP = keypoints[9]
    const ringFingerMCP = keypoints[13]
    const fingerMCP = keypoints[17]

    const x = (wrist.x + indexFingerMCP.x + middleFingerMCP.x + ringFingerMCP.x + fingerMCP.x) / 5
    const y = (wrist.y + indexFingerMCP.y + middleFingerMCP.y + ringFingerMCP.y + fingerMCP.y) / 5
    const handCenter: Point = { x, y }

    return handCenter
  }

  async estimateHands(img: PixelInput) {
    const detector = this.detector;

    let hands: Array<Hand> = [];

    try {
      hands = await detector.estimateHands(img, { flipHorizontal: true });

      return hands;
    } catch (err) {
      detector.dispose();
      this.detector = undefined;
      throw new Error(`Houve um erro ao detectar as mãos: ${err}`);
    }
  }
}