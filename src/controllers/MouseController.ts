import { GesturesDef, GesturesStringDef, gestureNameMap } from '@gestures/types'
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
        this.view.drawCursor(gestureNameMap[gesture] as GesturesStringDef, handCenter)
    }

    private execute(gesture: GesturesDef) {
        this.view.execute(gestureNameMap[gesture] as GesturesStringDef)
    }

    private async estimateHands() {
        const hands = await this.handLandmarkService.estimateFromVideo(this.camera.video)
        return hands as Array<Hand>
    }

    private normalizeHands(hands: Array<Hand>) {
        const normalizedHands = hands.map(hand => {
            return this.handLandmarkService.normalize(hand, this.camera.video) 
        })

        return normalizedHands as Array<Hand>
    }

    private async estimateGesture(hands: Array<Hand>) {
        const gesture = await this.gestureService.predict(hands)
        return gesture
    }

    private async loop() {
        const hands = await this.estimateHands()
        const normalizedHands = this.normalizeHands(hands)
        const handCenter = this.getHandCenter(hands)
        console.log(handCenter)
        // const gesture = await this.estimateGesture(normalizedHands)
        // console.log(gesture)

        // this.drawCursor(gesture, handCenter)
        // this.execute(gesture)

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