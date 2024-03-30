/* eslint-disable no-case-declarations */
import { Camera } from '@lib/Camera';
import HandLandmarkEstimatorService from '@services/HandLandmarkEstimatorService';
import EditGestureView from '@views/EditGestureView';
import { ImageCaptureHandler, ImageProcessingHandler } from './handlers';
import { CaptureStates, IEditGestureControllerProps } from './types';

export default class EditGestureController {
  private view: EditGestureView;
  private camera: Camera;
  private handLandmarkService: HandLandmarkEstimatorService;
  private state: CaptureStates;

  private imageCaptureHandler: ImageCaptureHandler
  private imageProcessingHandler: ImageProcessingHandler

  constructor({
    camera,
    view,
    handLandmarkService,
    gesture,
  }: IEditGestureControllerProps) {
    this.camera = camera;
    this.view = view;
    this.handLandmarkService = handLandmarkService;

    this.imageCaptureHandler = new ImageCaptureHandler({ camera, gesture, handLandmarkService, view })
    this.imageProcessingHandler = new ImageProcessingHandler({ gesture, handLandmarkService, view })

    this.state = CaptureStates.Started;
  }

  private setState(newState: CaptureStates) {
    this.state = newState
  }

  private onStart() {
    this.view.onStart();
    const startButton = this.view.startButton
    startButton.addEventListener('mouseup', () => {
      this.setState(CaptureStates.Running)
    })
  }

  private async onRunning() {
    if (!this.imageCaptureHandler.start()) {
      this.imageCaptureHandler.stop()
      this.setState(CaptureStates.Done)
    }
  }

  private onDone() {
    this.view.onDone()
    const finishButton = this.view.finishButton
    finishButton.addEventListener('mouseup', () => {
      this.setState(CaptureStates.Processing)
    })
  }

  private async onProcessing() {
    await this.imageProcessingHandler.start()
    this.setState(CaptureStates.Stopped)
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
      case CaptureStates.Processing:
        this.onProcessing();
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

    this.view.dispose()
    this.camera.dispose()
    this.handLandmarkService.dispose()

    return this;
  }
}
