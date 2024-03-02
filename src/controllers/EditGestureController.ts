/* eslint-disable no-case-declarations */
import { gestureNameMap } from '@gestures/types';
import { Camera } from '@lib/Camera';
import GestureEstimatorService from '@services/GestureEstimatorService';
import HandLandmarkEstimatorService from '@services/HandLandmarkEstimatorService';
import { Hand } from '@tensorflow-models/hand-pose-detection';
import { checkEventCanExecute } from '@utils/checkEventCanExecute';
import { setStorageData } from '@utils/storage';
import EditGestureView from '@views/EditGestureView';

interface IEditGestureControllerProps {
  view: EditGestureView;
  camera: Camera;
  handLandmarkService: HandLandmarkEstimatorService;
  gestureService: GestureEstimatorService;
  gesture: number
}

enum CaptureStates {
  Stopped,
  Started,
  Running,
  Done,
}

const { shouldExecute } = checkEventCanExecute(2000);

export default class EditGestureController {
  private view: EditGestureView;
  private camera: Camera;
  private handLandmarkService: HandLandmarkEstimatorService;
  private gestureService: GestureEstimatorService;
  private gesture: number
  private state: CaptureStates;

  private parsedGestureData: Array<Array<number>> = []

  constructor({
    camera,
    view,
    handLandmarkService,
    gestureService,
    gesture,
  }: IEditGestureControllerProps) {
    this.camera = camera;
    this.view = view;
    this.handLandmarkService = handLandmarkService;
    this.gestureService = gestureService;
    this.gesture = gesture

    this.state = CaptureStates.Started;
  }

  private isDone() {
    return this.view.getCaptureListLength() >= 2;
  }

  private showCaptures() {
    this.view.showCaptures();
  }

  private appendParsedGestureData(data: Array<number>) {
    this.parsedGestureData.push(data)
  }

  private appendGesture(img: HTMLImageElement) {
    this.view.appendGesture(img);
  }

  private capture() {
    return this.view.capture(this.camera.video);
  }

  private onStart() {
    this.view.onStart(() => {
      this.state = CaptureStates.Running;
    });
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
    await this.runCaptureLoop();
  }

  private async estimateHands(img: HTMLImageElement) {
    const hands = await this.handLandmarkService.estimateHands(img);
    return hands as Array<Hand>;
  }

  private normalizeHand(hand: Hand, img: HTMLImageElement) {
    const normalizedHand = this.handLandmarkService.normalize(hand, img);

    return normalizedHand as Hand;
  }

  private parse(hand: Hand) {
    const parsedHandsData = this.handLandmarkService.parse(hand);
    parsedHandsData.push(this.gesture)

    return parsedHandsData
  }

  private async parseGestureData() {
    const gestures = this.view.getCaptureList()
  
    await Promise.all(gestures.map(async gesture => {
      const hands = await this.estimateHands(gesture)
      const normalizedHand = this.normalizeHand(hands[0], gesture)
      const parsedHandsData = this.parse(normalizedHand)
      this.appendParsedGestureData(parsedHandsData)
    }))
  }

  private async save() {
    await this.parseGestureData()
    await setStorageData({ [gestureNameMap[this.gesture]]: this.parsedGestureData })
  }

  private onDone() {
    this.state = CaptureStates.Stopped
    this.view.onDone(async () => {
      await this.save()
    });
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

  static async dispose(deps: IEditGestureControllerProps) {
    const controller = new EditGestureController(deps);
    controller.state = CaptureStates.Stopped
    controller.parsedGestureData = []
    controller.view.dispose()

    return controller;
  }
}
