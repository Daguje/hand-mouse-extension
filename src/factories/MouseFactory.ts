import MouseController from "@controllers/MouseController";
import { Camera } from "@lib/Camera";
import HandLandmarkEstimatorService from "@services/HandLandmarkEstimatorService";
import MouseView from "@views/MouseView";
import { TFJSHandDector } from "@handLandmarkDetectors/tfjs";
import GestureEstimatorService from "@services/GestureEstimatorService";
import { Click } from "@gestures/Click";
import { None } from "@gestures/None";
import { FreeMove } from "@gestures/FreeMove";
import { GoBack } from "@gestures/GoBack";
import { ScrollDown } from "@gestures/ScrollDown";
import { ScrollUp } from "@gestures/ScrollUp";
import LoadingToast from "@lib/Loading";
import SVMClassifier from "@classifiers/svm";

await LoadingToast.show()

const camera = await Camera.create()
const tfjsHandLandmarkDetector = await TFJSHandDector.create()
const svmClassifier = SVMClassifier.create()

const factory = {
    initialize() {
        return MouseController.initialize({
            camera,
            view: new MouseView({
                gestures: {
                    click: new Click(),
                    freeMove: new FreeMove(),
                    goBack: new GoBack(),
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

LoadingToast.hide()

export default factory