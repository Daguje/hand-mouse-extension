import EditGestureController from '@controllers/EditGestureController';
import { TFJSHandDector } from '@handLandmarkDetectors/tfjs';
import { Camera } from '@lib/Camera';
import HandLandmarkEstimatorService from '@services/HandLandmarkEstimatorService';
import EditGestureView from '@views/EditGestureView';

const camera = await Camera.create();
const tfjsHandLandmarkDetector = await TFJSHandDector.create();

const videoContainer = document.getElementById(
  'video-container',
) as HTMLDivElement;

Camera.draw(camera.video, videoContainer);

const factory = {
  async initialize(gesture: number) {
    return EditGestureController.initialize({
      gesture,
      camera,
      view: new EditGestureView(),
      handLandmarkService: new HandLandmarkEstimatorService({
        handLandmarkDetector: tfjsHandLandmarkDetector,
      }),
    });
  },
  dispose(controller: EditGestureController) {
    return controller.dispose()
  }
};

export default factory;
