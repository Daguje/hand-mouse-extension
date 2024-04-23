import {
  GesturesDef,
  gesturePortugueseTranslateMap
} from '@gestures/types';
import HandLandmarkEstimatorService from '@services/HandLandmarkEstimatorService';
import { NotificationService } from '@services/NotificationService';
import { Hand } from '@tensorflow-models/hand-pose-detection';
import { Capture } from '../views';

interface IProcessingDataHandlerProps {
  handLandmarkService: HandLandmarkEstimatorService;
  gesture: GesturesDef;
}

export default class ProcessingDataHandler {
  private handLandmarkService: HandLandmarkEstimatorService;
  private gesture: GesturesDef;

  constructor({
    handLandmarkService,
    gesture,
  }: Partial<IProcessingDataHandlerProps>) {
    this.handLandmarkService = handLandmarkService;
    this.gesture = gesture;
  }

  private async estimateHands(img: HTMLImageElement) {
    const hands = await this.handLandmarkService.estimateFromImage(img);
    return hands as Array<Hand>;
  }

  private preprocess(hand: Hand, capture: HTMLImageElement) {
    return this.handLandmarkService.preprocess(hand, capture);
  }

  async preProcessData(captures: Array<Capture>) {
    const data = [];
    const labels = [];

    NotificationService.info(
      `Processando Imagens de ${gesturePortugueseTranslateMap[this.gesture]}`,
    );
    for await (const capture of captures) {
      const hands = await this.estimateHands(capture.img);

      if (!hands.length) continue;

      const preprocessedData = this.preprocess(hands[0], capture.img);

      data.push(preprocessedData);
      labels.push(this.gesture);
    }
    NotificationService.success(
      `Imagens de ${
        gesturePortugueseTranslateMap[this.gesture]
      } Processadas com sucesso`,
    );

    return { data, labels, preview: captures[0] };
  }
}
