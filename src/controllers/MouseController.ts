import { GesturesDef } from '@gestures/types'
import { Camera } from '@lib/Camera'
import GestureEstimatorService from '@services/GestureEstimatorService'
import HandLandmarkEstimatorService from '@services/HandLandmarkEstimatorService'
import { Hand } from '@tensorflow-models/hand-pose-detection'
import MouseView from '@views/MouseView'
import { Point } from '../types'

interface IMouseControllerProps {
    view: MouseView
    camera: Camera
    handLandmarkService: HandLandmarkEstimatorService
    gestureService: GestureEstimatorService
}

export default class MouseController {
    private view: MouseView
    private camera: Camera
    private handLandmarkService: HandLandmarkEstimatorService
    private gestureService: GestureEstimatorService

    constructor({ camera, view, handLandmarkService, gestureService }: IMouseControllerProps) {
        this.camera = camera
        this.view = view
        this.handLandmarkService = handLandmarkService
        this.gestureService = gestureService
    }

    private getHandCenter(hands: unknown) {
        return this.handLandmarkService.getHandCenter(hands)
    }

    private drawCursor(gesture: GesturesDef, handCenter: Point) {
        if(!handCenter) return
        this.view.drawCursor(gesture, handCenter)
    }

    private execute(gesture: GesturesDef) {
        this.view.execute(gesture)
    }

    private async estimateHands() {
        const hands = await this.handLandmarkService.estimateHands(this.camera.video)
        return hands as Array<Hand>
    }

    private async estimateGesture(hands: Array<Hand>) {
        const gesture = await this.gestureService.predict(hands)
        return gesture
    }

    private async loop() {
        const hands = await this.estimateHands()
        const gesture = await this.estimateGesture(hands)

        const handCenter = this.getHandCenter(hands)
        this.drawCursor(gesture, handCenter)
        this.execute(gesture)

        this.view.loop(this.loop.bind(this))
    }

    private async init() {
        await this.loop()
    }

    static async initialize(deps: IMouseControllerProps) {
        const controller = new MouseController(deps)
        controller.init()

        return controller
    }
}