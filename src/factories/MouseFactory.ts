import MouseController from "@controllers/MouseController";
import { Camera } from "@lib/Camera";
import HandLandmarkEstimatorService from "@services/HandLandmarkEstimatorService";
import MouseView from "@views/MouseView";
import { TFJSHandDector } from "@handLandmarkDetectors/tfjs";
import GestureEstimatorService from "@services/GestureEstimatorService";
import { Click } from "@gestures/Click";
import { None } from "@gestures/None";
import { FreeMove } from "@gestures/FreeMove";
import { Backward } from "@gestures/Backward";
import { ScrollDown } from "@gestures/ScrollDown";
import { ScrollUp } from "@gestures/ScrollUp";
import SVMClassifier from "@classifiers/svm";
import { Forward } from "@gestures/Forward";

const factory = {
    async initialize() {
        const camera = await Camera.create()
        const tfjsHandLandmarkDetector = await TFJSHandDector.create()
        const svmClassifier = await SVMClassifier.load()

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