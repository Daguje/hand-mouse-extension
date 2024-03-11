import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import { Hand } from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-backend-webgl'
import { staticImplements } from '@utils/staticImplements';
import { IStaticHandLandmarkDetector } from './types';
import { Point } from '../types';
import * as tf from '@tensorflow/tfjs'

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

  normalize(hand: Hand, img: HTMLVideoElement) {
    const normalizedHand = hand
    const input = tf.browser.fromPixels(img)

    normalizedHand.keypoints.forEach(({ x, y }) => ({
      x: x / input.shape[0],
      y: y / input.shape[1]
    }))

    return normalizedHand
  }

  relativize(hand: Hand) {
    const relativizedHand = hand
   
    relativizedHand.keypoints.forEach(({ x, y, ...keypoint }) => ({
      x: x - relativizedHand.keypoints[0].x,
      y: y - relativizedHand.keypoints[0].y,
      ...keypoint
    }))

    return relativizedHand
  }

  convert(hand: Hand) {
    const convertHandsData =  hand.keypoints.map(({ x, y }) => {
      return [x, y]
    })

    return convertHandsData.flat()
  }

  async estimateFromVideo(video: HTMLVideoElement) {
    return await this.estimateHands(video, { staticImageMode: false })
  }

  async estimateFromImage(image: HTMLImageElement) {
    return await this.estimateHands(image, { staticImageMode: true })
  }

  async estimateHands(frame: HTMLVideoElement | HTMLImageElement, options?: handPoseDetection.MediaPipeHandsMediaPipeEstimationConfig) {
    const detector = this.detector;

    let hands: Array<Hand> = [];
    const input = tf.browser.fromPixels(frame)
    
    try {
      hands = await detector.estimateHands(input, { flipHorizontal: true, ...options });

      return hands;
    } catch (err) {
      detector.dispose();
      this.detector = undefined;
      throw new Error(`Houve um erro ao detectar as mãos: ${err}`);
    }
  }
}