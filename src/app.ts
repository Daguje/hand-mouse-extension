import { PixelInput } from '@tensorflow-models/hand-pose-detection/dist/shared/calculators/interfaces/common_interfaces'
import { Camera, HandDector } from './lib'

let video: PixelInput
let handDetector: HandDector

const results = async () => {
    const hands = await handDetector.estimateHands(video)

    console.log({ hands })

    requestAnimationFrame(results)
}

const app = async () => {
    video = await Camera.create()
    handDetector = await HandDector.create()

    Camera.draw(video)

    results()
}

app()   