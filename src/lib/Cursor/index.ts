import { Hand, Keypoint } from "@tensorflow-models/hand-pose-detection";
import { estimateGesture } from "../HandDetector/utils";
import { ICursorProps } from "./types";

export class Cursor {
    video: HTMLVideoElement
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    baseRadius: number
    outterRadius: number
    shrinkFactor: number
    strokeColor: string
    fillColor: string
    gestureDetected: boolean

    constructor({ video, canvas, ctx }: ICursorProps) {
        this.video = video
        this.canvas = canvas
        this.ctx =  ctx
        this.ctx.globalCompositeOperation = "destination-over";

        this.baseRadius = 10
        this.outterRadius = 18
        this.shrinkFactor = 0.75
        this.gestureDetected = false
 
        this.strokeColor = '#383838'
        this.fillColor = '#f7f7f7'
    }

    drawHands(hands: Array<Hand>) {
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
          
        this.drawHandCenter(hand.keypoints)
    }

    getHandCenter(keypoints: Array<Keypoint>): Keypoint {
        const wrist = keypoints[0]
        const indexFingerMCP = keypoints[5]
        const middleFingerMCP = keypoints[9]
        const ringFingerMCP = keypoints[13]
        const fingerMCP = keypoints[17]

        const x = (wrist.x + indexFingerMCP.x + middleFingerMCP.x + ringFingerMCP.x + fingerMCP.x) / 5
        const y = (wrist.y + indexFingerMCP.y + middleFingerMCP.y + ringFingerMCP.y + fingerMCP.y) / 5
        const handCenter: Keypoint = { x, y }

        return handCenter
    }

    drawHandCenter(keypoints: Array<Keypoint>) {
        const cursor = this.getHandCenter(keypoints)
        
        const xRatio = this.canvas.width / this.video.width
        const yRatio = this.canvas.height / this.video.height
        
        cursor.x *= xRatio
        cursor.y *= yRatio

        const estimatedGestures = estimateGesture(keypoints)
        this.gestureDetected = !!estimatedGestures.length
        this.drawCursor(cursor.x, cursor.y, this.baseRadius, this.outterRadius)
        
        for(let i = 0; i < estimatedGestures.length; i++) {
            if (estimatedGestures[i].score < 9) continue
            
            switch(estimatedGestures[i].name) {
                case 'closedHandGesture':
                    this.drawAutoScrollCursor(cursor.x, cursor.y, this.baseRadius, this.outterRadius)
                    break;
                case 'okGesture':
                    this.drawClickCursor(cursor.x, cursor.y, this.baseRadius, this.outterRadius)
                    break;
                case 'victoryGesture':
                    console.log('Victory')
                    break;
                default:
                    console.log('Nada')
            }
        }
    }

    drawCursor(x: number, y: number, innerRadius: number, outterRadius: number){
        if(!this.gestureDetected) {
            if(this.baseRadius < 8){
                this.baseRadius *= 1 + this.shrinkFactor
            }
        }

        this.clearScreen()

        this.ctx.fillStyle = this.fillColor
        this.ctx.strokeStyle = this.fillColor
        this.ctx.lineWidth = 2

        this.ctx.beginPath()
        this.ctx.arc(x, y, innerRadius, 0, 2 * Math.PI)
        this.ctx.closePath()
        
        this.ctx.lineWidth = 1
        this.ctx.strokeStyle = this.strokeColor
        this.ctx.stroke()

        this.ctx.fill()
        
        this.ctx.beginPath()
        this.ctx.arc(x, y, outterRadius, 0, 2 * Math.PI)
        this.ctx.closePath()

        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = this.fillColor
        this.ctx.stroke()

        this.ctx.beginPath()
        this.ctx.arc(x, y, outterRadius, 0, 2 * Math.PI)
        this.ctx.closePath()

        this.ctx.lineWidth = 4
        this.ctx.strokeStyle = this.strokeColor
        this.ctx.stroke()
    }

    drawClickCursor(x: number, y: number, innerRadius: number, outterRadius: number) {
        if(this.baseRadius > 4) this.baseRadius *= this.shrinkFactor

        this.drawCursor(x, y, innerRadius, outterRadius)
    }

    drawTriangle(x1: number, y1: number, x2: number, y2: number, xOff: number, yOff: number) {
        this.ctx.beginPath()
        this.ctx.moveTo(xOff, yOff)
        this.ctx.lineTo(x1, y1)
        this.ctx.lineTo(x2, y2)
        this.ctx.closePath()
        
        this.ctx.lineWidth = 1
        this.ctx.strokeStyle = this.strokeColor
        this.ctx.stroke()

        this.ctx.fill()
    }

    drawTopTriangle(x: number, y: number) {
        this.drawTriangle(x + 6, y - 24, x - 6, y - 24, x, y - 34)
    }

    drawRightTriangle(x: number, y: number) {
        this.drawTriangle(x + 24, y - 6, x + 24, y + 6, x + 34, y)
    }
    
    drawBottomTriangle(x: number, y: number) {
        this.drawTriangle(x + 6, y + 24, x - 6, y + 24, x, y + 34)
    }

    drawLeftTriangle(x: number, y: number) {
        this.drawTriangle(x - 24, y - 6, x - 24, y + 6, x - 34, y)
    }

    drawScrollUpCursor(x: number, y: number, innerRadius: number, outterRadius: number) {
        this.clearScreen()

        this.drawClickCursor(x, y, innerRadius, outterRadius)
        this.drawTopTriangle(x, y)
    }

    drawScrollRightCursor(x: number, y: number, innerRadius: number, outterRadius: number) {
        this.clearScreen()

        this.drawClickCursor(x, y, innerRadius, outterRadius)
        this.drawRightTriangle(x, y)
    }

    drawScrollDownCursor(x: number, y: number, innerRadius: number, outterRadius: number) {
        this.clearScreen()

        this.drawClickCursor(x, y, innerRadius, outterRadius)
        this.drawBottomTriangle(x, y)
    }

    drawScrollLeftCursor(x: number, y: number, innerRadius: number, outterRadius: number) {
        this.clearScreen()

        this.drawClickCursor(x, y, innerRadius, outterRadius)
        this.drawLeftTriangle(x, y)
    }

    drawAutoScrollCursor(x: number, y: number, innerRadius: number, outterRadius: number) {
        if(this.baseRadius > 4) this.baseRadius *= this.shrinkFactor

        this.clearScreen()

        this.drawClickCursor(x, y, innerRadius, outterRadius)
        this.drawTopTriangle(x, y)
        this.drawRightTriangle(x, y)
        this.drawBottomTriangle(x, y)
        this.drawLeftTriangle(x, y)
    }
}