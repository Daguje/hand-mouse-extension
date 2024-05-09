import SVMClassifier from "@classifiers/svm";
import MouseController from "@features/mouse/controllers";
import MouseView from "@features/mouse/views";
import { Backward } from "@gestures/Backward";
import { Click } from "@gestures/Click";
import { Forward } from "@gestures/Forward";
import { FreeMove } from "@gestures/FreeMove";
import { None } from "@gestures/None";
import { ScrollDown } from "@gestures/ScrollDown";
import { ScrollUp } from "@gestures/ScrollUp";
import { TFJSHandDector } from "@handLandmarkDetectors/tfjs";
import { Camera } from "@lib/Camera";
import GestureEstimatorService from "@services/GestureEstimatorService";
import HandLandmarkEstimatorService from "@services/HandLandmarkEstimatorService";

const factory = {
    async initialize() {
        const camera = await Camera.create()
        const tfjsHandLandmarkDetector = await TFJSHandDector.create()
        const svmClassifier = await SVMClassifier.load()
          
        await Camera.drawOnTop(camera.video, document.body);

        return MouseController.initialize({
            camera,
            view: new MouseView({
                gestures: {
                    click: new Click(),
                    freeMove: new FreeMove(),
                    backward: new Backward(),
                    forward: new Forward(),
                    scrollDown: new ScrollDown(),
                    scrollUp: new ScrollUp(),
                    none: new None(),
                }
            }),
            handLandmarkService: new HandLandmarkEstimatorService({ 
                handLandmarkDetector: tfjsHandLandmarkDetector
            }),
            gestureService: new GestureEstimatorService({
                gestureClassifier: svmClassifier
            })
        })
    }
}

export default factory