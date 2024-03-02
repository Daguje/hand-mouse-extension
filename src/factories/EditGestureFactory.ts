import SVMClassifier from "@classifiers/svm"
import EditGestureController from "@controllers/EditGestureController"
import { TFJSHandDector } from "@handLandmarkDetectors/tfjs"
import { Camera } from "@lib/Camera"
import GestureEstimatorService from "@services/GestureEstimatorService"
import HandLandmarkEstimatorService from "@services/HandLandmarkEstimatorService"
import EditGestureView from "@views/EditGestureView"

const camera = await Camera.create()
const tfjsHandLandmarkDetector = await TFJSHandDector.create()
const svmClassifier = SVMClassifier.create()

const videoContainer = document.getElementById('video-container') as HTMLDivElement
Camera.draw(camera.video, videoContainer)

const deps = {
    camera,
    view: new EditGestureView(),
    handLandmarkService: new HandLandmarkEstimatorService({ 
        handLandmarkDetector: tfjsHandLandmarkDetector
    }),
    gestureService: new GestureEstimatorService({
        gestureClassifier: svmClassifier
    })
}

const factory = {
    initialize(gesture: number) {
        return EditGestureController.initialize({ ...deps, gesture })
    },
    dispose(gesture: number) {
        return EditGestureController.dispose({ ...deps, gesture })
    }
}

export default factory