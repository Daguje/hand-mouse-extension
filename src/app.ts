import { PixelInput } from '@tensorflow-models/hand-pose-detection/dist/shared/calculators/interfaces/common_interfaces'
import { Camera, Cursor, HandDector } from './lib'

let video: PixelInput
let handDetector: HandDector
let cursor: Cursor

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

canvas.style.pointerEvents = 'none'
canvas.width = globalThis.screen.availWidth
canvas.height = globalThis.screen.availHeight
canvas.style.position = 'fixed'
canvas.style.top = '0'
canvas.style.left = '0'
canvas.style.zIndex = '9999'

document.body.appendChild(canvas)

const results = async () => {
    const hands = await handDetector.estimateHands(video)
    cursor.drawHands(hands)
    
    requestAnimationFrame(results)
}

const app = async () => {
    video = await Camera.create()
    handDetector = await HandDector.create()
    cursor = new Cursor({ video, canvas, ctx })

    Camera.draw(video)

    results()
}

app()   