import { TFJSHandDector } from "@handLandmarkDetectors/tfjs";
import { Camera } from "@lib/Camera";
import HandLandmarkEstimatorService from "@services/HandLandmarkEstimatorService";
import EditGestureDialogController from "./controllers";
import { CaptureObserversView, CaptureProgressView, CapturesListContainerView, CapturesListView, EditGestureDialogView } from "./views";
import { DialogView } from "./views/DialogView";

const factory = {
  async initialize(gesture: number) {
    const tfjsHandLandmarkDetector = await TFJSHandDector.create();
    const camera = await Camera.create();
    
    const videoContainer = document.getElementById(
      'video-container',
    ) as HTMLDivElement;
    
    Camera.draw(camera.video, videoContainer);

    return EditGestureDialogController.initialize({
      gesture,
      camera,
        view: new EditGestureDialogView({ 
          captureObserversView: new CaptureObserversView(),
          captureProgressView: new CaptureProgressView(),
          capturesListContainerView: new CapturesListContainerView({ 
            list: new CapturesListView({ 
              captures: [] 
            }) 
          }),
          dialogView: new DialogView({
            dialog: document.getElementById('edit-dialog') as HTMLDialogElement,
            title: document.getElementById('edit-gesture-dialog-title') as HTMLHeadingElement,
            description: document.getElementById('edit-gesture-dialog-description') as HTMLParagraphElement
          })
        }),
      handLandmarkService: new HandLandmarkEstimatorService({
        handLandmarkDetector: tfjsHandLandmarkDetector,
      }),
    });
  },
};

export default factory;
