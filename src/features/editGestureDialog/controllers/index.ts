/* eslint-disable no-case-declarations */
import { GesturesDef } from '@gestures/types';
import { Camera } from '@lib/Camera';
import { Constants } from '@lib/constants';
import HandLandmarkEstimatorService from '@services/HandLandmarkEstimatorService';
import { checkEventCanExecute } from '@utils/checkEventCanExecute';
import ProcessingDataHandler from '../handlers/processingDataHandler';
import SaveGestureDataHandler from '../handlers/saveGestureDataHandler';
import { EditGestureDialogView } from '../views';

enum CaptureStates {
  Setup,
  Idle,
  Paused,
  Capturing,
  DoneCapturing,
  Saving,
  Processing,
  DeletingGestures,
  Closing,
}

interface IEditGestureDialogControllerProps {
  view: EditGestureDialogView;
  camera: Camera;
  handLandmarkService: HandLandmarkEstimatorService;
  gesture: GesturesDef;
}

const { shouldExecute } = checkEventCanExecute(Constants.TIME_BETWEEN_CAPTURES);

export default class EditGestureDialogController {
  private view: EditGestureDialogView;
  private camera: Camera;
  private handLandmarkService: HandLandmarkEstimatorService;
  private state: CaptureStates;
  private gesture: GesturesDef;
  private processingDataHandler: ProcessingDataHandler
  private saveGestureDataHandler: SaveGestureDataHandler

  constructor({
    camera,
    view,
    handLandmarkService,
    gesture,
  }: IEditGestureDialogControllerProps) {
    this.camera = camera;
    this.view = view;
    this.handLandmarkService = handLandmarkService;

    this.state = CaptureStates.Setup;
    this.gesture = gesture;

    this.processingDataHandler = new ProcessingDataHandler({ gesture, handLandmarkService })
    this.saveGestureDataHandler = new SaveGestureDataHandler({ gesture })
  }

  private setState(newState: CaptureStates) {
    this.state = newState;
  }

  private onClosing() {
    console.log('closing');
    this.view.onClosing();
    return this.dispose();
  }

  private async onSaving() {
    console.log('saving');
    this.view.onSaving();

    const captures = this.view.captures
    const { data, labels, preview } = await this.processingDataHandler.preProcessData(captures)
    await this.saveGestureDataHandler.saveOnLocalStorage(data, labels, preview.img)

    this.setState(CaptureStates.Setup)
  }

  private async onPaused() {
    this.view.onPaused();
    console.log('paused');
  }

  private onDelete() {
    console.log('deleting')
    this.view.onDelete()
    this.setState(CaptureStates.Paused)
  }

  private onDoneCapturing() {
    console.log('done capturing');
    this.view.onDoneCapturing();
  }

  private onCapturing() {
    console.log('capturing');
    if (this.view.totalCaptures >= Constants.MAX_PICTURES_TAKEN) {
      this.setState(CaptureStates.DoneCapturing);
      return;
    }

    if (!shouldExecute()) return;

    this.view.onBeginCaptures(this.camera.video);
  }

  private onIdle() {
    console.log('idle');
  }

  private onSetup() {
    this.view.onSetup(this.gesture);

    this.view.beginCapturesButton.addEventListener('mouseup', () => {
      this.setState(CaptureStates.Capturing);
    });
    this.view.saveCapturesButton.addEventListener('mouseup', () => {
      this.setState(CaptureStates.Saving);
    });
    this.view.pauseCapturesButton.addEventListener('mouseup', () => {
      this.setState(CaptureStates.Paused);
    });
    this.view.resumeCaptureButton.addEventListener('mouseup', () => {
      this.setState(CaptureStates.Capturing);
    });
    this.view.closeDialogButton.addEventListener('mousedown', () => {
      this.setState(CaptureStates.Closing);
    });
    this.view.deleteCapturesButton.addEventListener('mousedown', () => {
      this.setState(CaptureStates.DeletingGestures)
      this.view.onDelete();
    })
    this.setState(CaptureStates.Idle);
  }

  private async loop() {
    switch (this.state) {
      case CaptureStates.Setup:
        this.onSetup();
        break;
      case CaptureStates.Idle:
        this.onIdle();
        break;
      case CaptureStates.Capturing:
        this.onCapturing();
        break;
      case CaptureStates.DoneCapturing:
        this.onDoneCapturing();
        break;
      case CaptureStates.Paused:
        this.onPaused();
        break;
      case CaptureStates.Saving:
        await this.onSaving();
        break;
      case CaptureStates.DeletingGestures:
        await this.onDelete();
        break;
      case CaptureStates.Closing:
        return this.onClosing();
    }

    this.view.loop(this.loop.bind(this));
  }

  private async init() {
    await this.loop();
  }

  static async initialize(deps: IEditGestureDialogControllerProps) {
    const controller = new EditGestureDialogController(deps);
    controller.init();

    return controller;
  }

  dispose() {
    this.state = CaptureStates.Idle;

    this.camera.dispose();
    this.handLandmarkService.dispose();

    return this;
  }
}
