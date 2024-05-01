import { TFJSHandDector } from "@handLandmarkDetectors/tfjs";
import { Camera } from "@lib/Camera";
import HandLandmarkEstimatorService from "@services/HandLandmarkEstimatorService";
import { DialogView } from "../DialogView";
import EditGestureDialogController from "./controllers";
import { CaptureObserversView, CaptureProgressView, CapturesListContainerView, CapturesListView, EditGestureDialogView } from "./views";

const factory = {
  async initialize(gesture: number) {
    const dialogView = new DialogView({
      dialog: document.getElementById('edit-dialog') as HTMLDialogElement,
      title: document.getElementById('edit-gesture-dialog-title') as HTMLHeadingElement,
      description: document.getElementById('edit-gesture-dialog-description') as HTMLParagraphElement
    })

    dialogView.show()
    
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
          dialogView,
        }),
      handLandmarkService: new HandLandmarkEstimatorService({
        handLandmarkDetector: tfjsHandLandmarkDetector,
      }),
    });
  },
};

export default factory;
