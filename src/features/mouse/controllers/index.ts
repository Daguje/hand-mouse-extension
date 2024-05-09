import MouseView from '@features/mouse/views'
import { GesturesDef, GesturesStringDef, gestureNameMap } from '@gestures/types'
import { Camera } from '@lib/Camera'
import GestureEstimatorService from '@services/GestureEstimatorService'
import HandLandmarkEstimatorService from '@services/HandLandmarkEstimatorService'
import { Hand } from '@tensorflow-models/hand-pose-detection'
import { checkEventCanExecute } from '@utils/checkEventCanExecute'
import { Point } from '../../../types'

const { shouldExecute } = checkEventCanExecute(300)

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
    private _estimatedHands: Array<unknown>
    private _estimatedGesture: GesturesDef
    private _preProcessedHand: Array<number>
    private _handCenter: Point

    constructor({ camera, view, handLandmarkService, gestureService }: IMouseControllerProps) {
        this.camera = camera
        this.view = view
        this.handLandmarkService = handLandmarkService
        this.gestureService = gestureService

        this._estimatedHands = []
        this._estimatedGesture = GesturesDef.None
        this._preProcessedHand = []
        this._handCenter = { x: 0, y: 0 }
    }

    private getHandCenter(hands: unknown) {
        return this.handLandmarkService.getHandCenter(hands, this.camera.video)
    }

    private drawCursor(gesture: GesturesDef, handCenter: Point) {
        if(!gesture) return
        if(!handCenter) return

        this.view.drawCursor(gestureNameMap[gesture] as GesturesStringDef, handCenter)
    }

    private execute(gesture: GesturesDef) {
        this.view.execute(gestureNameMap[gesture] as GesturesStringDef)
    }

    private async estimateHands() {
        return await this.handLandmarkService.estimateFromVideo(this.camera.video)
    }

    private preprocess(hand: Hand) {
        return this.handLandmarkService.preprocess(hand, this.camera.video)
    }

    private async estimateGesture(data: Array<number>) {
        return await this.gestureService.predict(data)
    }

    private async loop() {
        this._estimatedHands = await this.estimateHands() as Array<Hand>
        
        if(this._estimatedHands.length) {
            this._preProcessedHand = this.preprocess(this._estimatedHands[0] as Hand)
            
            this._handCenter = this.getHandCenter(this._estimatedHands)
            this._estimatedGesture = await this.estimateGesture(this._preProcessedHand)
            
            this.execute(this._estimatedGesture)
            this.drawCursor(this._estimatedGesture, this._handCenter)
        }

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