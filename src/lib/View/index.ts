import { Hand, Keypoint } from "@tensorflow-models/hand-pose-detection";
import { PixelInput } from "@tensorflow-models/hand-pose-detection/dist/shared/calculators/interfaces/common_interfaces";

const fingersIndices = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
}

export class View {
    video: HTMLVideoElement
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    constructor(video: HTMLVideoElement) {
        this.video = video
        this.canvas = document.createElement('canvas')
        this.ctx =  this.canvas.getContext('2d')
        this.canvas.style.pointerEvents = 'none'
        this.canvas.width = globalThis.screen.availWidth
        this.canvas.height = globalThis.screen.availHeight
        this.canvas.style.position = 'fixed'
        this.canvas.style.top = '0'
        this.canvas.style.left = '0'
        this.canvas.style.zIndex = '9999' 

        document.body.appendChild(this.canvas)
    }

    distance(p1: Keypoint, p2: Keypoint){
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        return Math.sqrt(dx * dx + dy * dy)
    }

    applyKeypointsTransformations(keypoints: Array<Keypoint>): Array<Keypoint> {
        const ringFingerMCP = keypoints[13]
        const pinkyMCP = keypoints[17]
        const handSize = this.distance(ringFingerMCP, pinkyMCP)

        const scale = 50
        const xRatio = this.canvas.width * scale / (this.video.width * handSize)
        const yRatio = this.canvas.height * scale / (this.video.height * handSize)

        for(const keypoint of keypoints){
            // keypoint.x = keypoint.x * xRatio - this.video.width / 2
            // keypoint.y = keypoint.y * yRatio - this.video.height / 2 

            // Proporção da camera em relação a tela
            keypoint.x = keypoint.x * xRatio
            keypoint.y = keypoint.y * yRatio

            // Normalização do movimento em relação a distância da camera
            // keypoint.x = handSize * (keypoint.x + this.canvas.width / 2)
            // keypoint.y = handSize * (keypoint.y + this.canvas.height / 2)
        }

        return keypoints
    }

    drawHands(hands: Array<Hand>) {
        this.clearScreen()
        if (!hands.length) return

        for(let i = 0; i < hands.length; i++) {
            this.drawHand(hands[i])
        }
    }

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawHand(hand: Hand) {
        if(!hand.keypoints) return
        this.drawKeyPoints(hand.keypoints, hand.handedness)
    }

    drawKeyPoints(keypoints: Array<Keypoint>, handedness: 'Left' | 'Right') {
        this.ctx.fillStyle = handedness === 'Left' ? 'red' : 'blue'
        this.ctx.strokeStyle = 'white'
        this.ctx.lineWidth = 2
        this.ctx.lineJoin = 'round'

        keypoints = this.applyKeypointsTransformations(keypoints)

        const fingers = Object.keys(fingersIndices)
        for(let i = 0; i < fingers.length; i++){
            const currentFinger = fingers[i] as keyof typeof fingersIndices
            const points = fingersIndices[currentFinger].map(jointPos => keypoints[jointPos])

            this.drawLine(points)
        }

        for(const { x, y } of keypoints){
            this.drawPoint(x, y, 4)
        }
    }

    drawPoint(x: number, y: number, radius: number) {
        this.ctx.beginPath()
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI)
        this.ctx.fill()
    }

    drawLine(points: Array<Keypoint>) {
        const region = new Path2D();
        region.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
            const point = points[i];
            region.lineTo(point.x, point.y);
        }

        this.ctx.stroke(region);
    }
}