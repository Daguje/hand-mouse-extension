import { Camera } from '@lib/Camera'
import HandLandmarkEstimatorService from '@services/HandLandmarkEstimatorService'
import MouseView from '@views/MouseView'

interface IMouseControllerProps {
    view: MouseView
    camera: Camera
    handLandmarkService: HandLandmarkEstimatorService
}

export default class MouseController {
    private view: MouseView
    private camera: Camera
    private handLandmarkService: HandLandmarkEstimatorService

    constructor({ camera, view, handLandmarkService }: IMouseControllerProps) {
        this.camera = camera
        this.view = view
        this.handLandmarkService = handLandmarkService
    }

    private drawCursor() {
        this.view.drawCursor()
    }

    private async estimateHands() {
        const results = await this.handLandmarkService.estimateHands(this.camera.video)
        console.log({ results })
    }

    private loop() {
        this.drawCursor()
        this.estimateHands()
        this.view.loop(this.loop.bind(this))
    }

    private init() {
        this.loop()
    }

    static initialize(deps: IMouseControllerProps) {
        const controller = new MouseController(deps)
        controller.init()

        return controller
    }
}