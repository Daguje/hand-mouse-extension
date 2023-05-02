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
    video: PixelInput
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    constructor(video: PixelInput) {
        this.video = video
        this.canvas = document.createElement('canvas')
        this.ctx =  this.canvas.getContext('2d')
        this.canvas.style.pointerEvents = 'none'
        this.canvas.style.width = globalThis.screen.availWidth.toString() + 'px'
        this.canvas.style.height = globalThis.screen.availHeight.toString() + 'px'
        this.canvas.style.position = 'fixed'
        this.canvas.style.top = '0'
        this.canvas.style.left = '0'
        this.canvas.style.zIndex = '9999' 

        document.body.appendChild(this.canvas)
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
        this.ctx.fillStyle = 'red'
        this.ctx.strokeStyle = 'white'
        this.ctx.lineWidth = 1
        this.ctx.lineJoin = 'round'

        for(const keypoint of keypoints){
            const { x, y } = keypoint
            this.drawPoint(x, y, 2)
        }

        const fingers = Object.keys(fingersIndices)
        for(let i = 0; i < fingers.length; i++){
            const currentFinger = fingers[i] as keyof typeof fingersIndices
            const points = fingersIndices[currentFinger].map(jointPos => keypoints[jointPos])
            this.drawLine(points)
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