/* eslint-disable no-case-declarations */
import { gestureNameMap } from '@gestures/types';
import { Camera } from '@lib/Camera';
import { Constants } from '@lib/constants';
import HandLandmarkEstimatorService from '@services/HandLandmarkEstimatorService';
import { NotificationService } from '@services/NotificationService';
import { Hand } from '@tensorflow-models/hand-pose-detection';
import { checkEventCanExecute } from '@utils/checkEventCanExecute';
import { setStorageItem } from '@utils/storage';
import EditGestureView from '@views/EditGestureView';

interface IEditGestureControllerProps {
  view: EditGestureView;
  camera: Camera;
  handLandmarkService: HandLandmarkEstimatorService;
  gesture: number
}

enum CaptureStates {
  Stopped,
  Started,
  Running,
  Done,
}

const { shouldExecute } = checkEventCanExecute(Constants.TIME_BETWEEN_CAPTURES);

export default class EditGestureController {
  private view: EditGestureView;
  private camera: Camera;
  private handLandmarkService: HandLandmarkEstimatorService;
  private gesture: number
  private state: CaptureStates;

  constructor({
    camera,
    view,
    handLandmarkService,
    gesture,
  }: IEditGestureControllerProps) {
    this.camera = camera;
    this.view = view;
    this.handLandmarkService = handLandmarkService;
    this.gesture = gesture

    this.state = CaptureStates.Started;
  }

  private isDone() {
    return this.view.getCaptureListLength() >= Constants.MAX_PICTURES_TAKEN;
  }

  private stopProgress() {
    this.view.stopProgress()
  }

  private startProgress() {
    this.view.startProgress()
  }

  private showCaptures() {
    this.view.showCaptures();
  }

  private appendGesture(img: HTMLImageElement) {
    this.view.appendGesture(img);
  }

  private capture() {
    return this.view.capture(this.camera.video);
  }

  private handleStart() {
    this.state = CaptureStates.Running;
  }

  private onStart() {
    this.view.onStart();
    const startButton = this.view.startButton
    startButton.addEventListener('mouseup', () => this.handleStart())
  }

  private async runCaptureLoop() {
    if (this.isDone()) {
      this.state = CaptureStates.Done;
      return;
    }

    if (!shouldExecute()) return;

    const img = this.capture();
    this.appendGesture(img);
    this.showCaptures();
  }

  private async onRunning() {
    this.view.onRunning();
    this.startProgress();
    await this.runCaptureLoop();
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

  private async handleSave() {
    try {
      const [data, labels] = await this.preProcessData()
      if(data.length) await setStorageItem(gestureNameMap[this.gesture], data)
      if(labels.length) await setStorageItem(`${gestureNameMap[this.gesture]}Labels`, labels)
    } catch (e) {
      throw new Error(`Não foi possível salvar os dados em Local Storage: ${e}`)
    }
  }

  private onDone() {
    this.state = CaptureStates.Stopped
    this.stopProgress()
    this.view.onDone()
    
    const finishButton = this.view.finishButton
    finishButton.addEventListener('mouseup', () => this.handleSave())
  }

  private async loop() {
    switch (this.state) {
      case CaptureStates.Started:
        this.onStart();
        break;
      case CaptureStates.Running:
        this.onRunning();
        break;
      case CaptureStates.Done:
        this.onDone();
        break;
    }

    this.view.loop(this.loop.bind(this));
  }

  private async init() {
    await this.loop();
  }

  static async initialize(deps: IEditGestureControllerProps) {
    const controller = new EditGestureController(deps);
    controller.init();

    return controller;
  }

  dispose() {
    this.state = CaptureStates.Stopped
    this.view.startButton.removeEventListener('mouseup', this.handleStart)
    this.view.finishButton.removeEventListener('mouseup', this.handleSave)

    this.view.dispose()
    this.camera.dispose()

    return this;
  }
}
