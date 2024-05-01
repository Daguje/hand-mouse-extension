/* eslint-disable no-case-declarations */
import { GesturesDef, gestureNameMap } from '@gestures/types';
import { GesturesDataService } from '@services/GesturesDataService';
import { PreviewGestureDialogView } from '../views';

interface IPreviewGestureDialogControllerProps {
  view: PreviewGestureDialogView;
  gesture: GesturesDef
  gestureDataService: GesturesDataService
}

export default class PreviewGestureDialogController {
  private view: PreviewGestureDialogView;
  private gesture: GesturesDef
  private gestureDataService: GesturesDataService

  constructor({ view, gesture, gestureDataService }: IPreviewGestureDialogControllerProps) {
    this.view = view;
    this.gesture = gesture
    this.gestureDataService = gestureDataService
  }

  private async init(){
    const preview = await this.gestureDataService.getPreview(this.gesture) 
    this.view.setup(this.gesture, preview[`${gestureNameMap[this.gesture]}Preview`])
  }

  static async initialize(deps: IPreviewGestureDialogControllerProps) {
    const controller = new PreviewGestureDialogController(deps);
    await controller.init()

    return controller;
  }
}
