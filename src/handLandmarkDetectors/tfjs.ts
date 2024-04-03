import { NotificationService } from '@services/NotificationService';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import { Hand } from '@tensorflow-models/hand-pose-detection';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { staticImplements } from '@utils/staticImplements';
import { Point } from '../types';
import { IStaticHandLandmarkDetector } from './types';

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
      NotificationService.info('Iniciando Detector de mãos')
      this.detector = await TFJSHandDector.createDetector();
      NotificationService.success('Detector de mãos iniciado com sucesso!')
    } catch (e) {
      const message = 'Houve um erro ao criar o Detector de Mãos'

      NotificationService.error(message)
      throw new Error(`${message}: ${e}`)
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

  preProcess(hand: Hand, img: HTMLVideoElement | HTMLImageElement) {
    const input = tf.browser.fromPixels(img)

    const preProcessedHand =  hand.keypoints.map(({ x, y }) => {
      const newX = (x - hand.keypoints[0].x) / input.shape[0]
      const newY = (y - hand.keypoints[0].y) / input.shape[0]

      return [newX, newY]
    })

    input.dispose()
    return preProcessedHand.flat()
  }

  async estimateFromVideo(video: HTMLVideoElement) {
    return await this.estimateHands(video, { staticImageMode: false })
  }

  async estimateFromImage(image: HTMLImageElement) {
    return await this.estimateHands(image, { staticImageMode: true })
  }

  async estimateHands(frame: HTMLVideoElement | HTMLImageElement, options?: handPoseDetection.MediaPipeHandsMediaPipeEstimationConfig) {
    let hands: Array<Hand> = [];
    const input = tf.browser.fromPixels(frame)

    try {
      hands = await this.detector.estimateHands(input, { flipHorizontal: true, ...options });
      
    } catch (e) {
      this.detector.dispose();
      this.detector = undefined;

      const message = 'Houve um erro ao detectar as mãos'

      NotificationService.error(message)
      throw new Error(`${message}: ${e}`)
    } finally {
      input.dispose()
    }

    return hands;
  }

  dispose() {
    this.detector.dispose()
    this.detector = undefined
  }
}