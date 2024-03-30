import { GesturesDef, gestureNameMap } from "@gestures/types";
import { Camera } from "@lib/Camera";
import { Constants } from "@lib/constants";
import HandLandmarkEstimatorService from "@services/HandLandmarkEstimatorService";
import { NotificationService } from "@services/NotificationService";
import { Hand } from "@tensorflow-models/hand-pose-detection";
import { checkEventCanExecute } from "@utils/checkEventCanExecute";
import { setStorageItem } from "@utils/storage";
import EditGestureView from "@views/EditGestureView";
import { IEditGestureControllerProps } from "./types";

const { shouldExecute } = checkEventCanExecute(Constants.TIME_BETWEEN_CAPTURES);

export class ImageCaptureHandler {
  private camera: Camera
  private view: EditGestureView

  constructor({ camera, view }: Partial<IEditGestureControllerProps>) {
    this.camera = camera
    this.view = view
  }

  private onRunning() {
    this.view.onRunning()
  }

  private capture() {
    return this.view.capture(this.camera.video);
  }

  private showCaptures() {
    this.view.showCaptures();
  }

  private appendCapture(img: HTMLImageElement) {
    this.view.appendCapture(img);
  }

  private startProgress() {
    this.view.startProgress()
  }

  private stopProgress() {
    this.view.stopProgress()
  }
    
  private doneRunning() {
    return this.view.getCaptureListLength() >= Constants.MAX_PICTURES_TAKEN;
  }

  private run() {
    if (!shouldExecute()) return;

    const img = this.capture();
    this.appendCapture(img);
    this.showCaptures();
  }

  start() {
    this.onRunning();
    this.startProgress();

    if (this.doneRunning()) {
      return false
    }

    this.run()
    return true
  }

  stop() {
    this.stopProgress()
  }
}

export class ImageProcessingHandler {
  private handLandmarkService: HandLandmarkEstimatorService
  private gesture: GesturesDef
  private view: EditGestureView

  constructor({ handLandmarkService, gesture, view }: Partial<IEditGestureControllerProps>) {
    this.handLandmarkService = handLandmarkService;
    this.gesture = gesture;
    this.view = view;
  }

  private async estimateHands(img: HTMLImageElement) {
    const hands = await this.handLandmarkService.estimateFromImage(img);
    return hands as Array<Hand>;
  }

  private preprocess(hand: Hand, capture: HTMLImageElement) {
    return this.handLandmarkService.preprocess(hand, capture)
  }

  private async preProcessData() {
    const captures = this.view.getCaptureList()
    const data = []
    const labels = []

    NotificationService.info('Processando Imagens')
    for await (const capture of captures) {
      const hands = await this.estimateHands(capture)

      if(!hands.length) continue
      
      const preprocessedData = this.preprocess(hands[0], capture)

      data.push(preprocessedData)
      labels.push(this.gesture)
    }
    NotificationService.info('Imagens Processadas com sucesso')

    return [data, labels]
  }

  private async handleSaveOnLocalStorage() {
    try {
      const [data, labels] = await this.preProcessData()
      if(data.length) await setStorageItem(gestureNameMap[this.gesture], data)
      if(labels.length) await setStorageItem(`${gestureNameMap[this.gesture]}Labels`, labels)
    } catch (e) {
      throw new Error(`Não foi possível salvar os dados em Local Storage: ${e}`)
    }
  }

  async start() {
    await this.handleSaveOnLocalStorage()
  }
}