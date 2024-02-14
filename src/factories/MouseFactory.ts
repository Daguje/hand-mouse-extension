import MouseController from "@controllers/MouseController";
import { Camera } from "@lib/Camera";
import HandLandmarkEstimatorService from "@services/HandLandmarkEstimatorService";
import MouseView from "@views/MouseView";
import { TFJSHandDector } from "@handLandmarkDetectors/tfjs";

const camera = await Camera.create()
// const mediapipeHandLandmarkDetector = await MediaPipeHandDetector.create()
const tfjsHandLandmarkDetector = await TFJSHandDector.create()

const factory = {
    initialize() {
        return MouseController.initialize({
            camera,
            view: MouseView.initialize(),
            handLandmarkService: new HandLandmarkEstimatorService({ 
                handLandmarkDetector: tfjsHandLandmarkDetector
            })
        })
    }
}

export default factory