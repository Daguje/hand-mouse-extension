import { Hand, Keypoint } from "@tensorflow-models/hand-pose-detection";
import { estimateGesture } from "../HandDetector/utils";
import { ICursorProps } from "./types";

export class Cursor {
    video: HTMLVideoElement
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    constructor({ video, canvas, ctx }: ICursorProps) {
        this.video = video
        this.canvas = canvas
        this.ctx =  ctx
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
        this.ctx.globalCompositeOperation = "destination-over";
    
        this.ctx.fillStyle = 'white'
        this.ctx.strokeStyle = 'white'
        this.ctx.lineWidth = 2
        this.ctx.lineJoin = 'round'
        
        const cursor = this.getHandCenter(keypoints)
        
        const xRatio = this.canvas.width / this.video.width
        const yRatio = this.canvas.height / this.video.height
        
        cursor.x *= xRatio
        cursor.y *= yRatio

        const estimatedGestures = estimateGesture(keypoints)
        this.drawCursor(cursor.x, cursor.y, 8, 16)
        
        for (let i = 0; i < estimatedGestures.length; i++) {
            if (estimatedGestures[i].name === 'closedHandGesture' && estimatedGestures[i].score > 9) {
                this.drawAutoScrollCursor(cursor.x, cursor.y, 4, 16)
            }
            else if (estimatedGestures[i].name === 'okGesture' && estimatedGestures[i].score > 9) {
                this.drawCursor(cursor.x, cursor.y, 4, 16)
            }
            else if (estimatedGestures[i].name === 'victoryGesture' && estimatedGestures[i].score > 9) {
                console.log('Victory')
            }
        }
    }

    drawCursor(x: number, y: number, innerRadius: number, outterRadius: number){
        this.clearScreen()

        this.ctx.beginPath()
        this.ctx.arc(x, y, innerRadius, 0, 2 * Math.PI)
        this.ctx.fill()


        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.arc(x, y, outterRadius, 0, 2 * Math.PI)
        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawTriangle(x1: number, y1: number, x2: number, y2: number, xOff: number, yOff: number) {
        this.ctx.beginPath();
        this.ctx.moveTo(xOff, yOff);
        this.ctx.lineTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.fill();
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

        this.drawCursor(x, y, innerRadius, outterRadius)
        this.drawTopTriangle(x, y)
    }

    drawScrollRightCursor(x: number, y: number, innerRadius: number, outterRadius: number) {
        this.clearScreen()

        this.drawCursor(x, y, innerRadius, outterRadius)
        this.drawRightTriangle(x, y)
    }

    drawScrollDownCursor(x: number, y: number, innerRadius: number, outterRadius: number) {
        this.clearScreen()

        this.drawCursor(x, y, innerRadius, outterRadius)
        this.drawBottomTriangle(x, y)
    }

    drawScrollLeftCursor(x: number, y: number, innerRadius: number, outterRadius: number) {
        this.clearScreen()

        this.drawCursor(x, y, innerRadius, outterRadius)
        this.drawLeftTriangle(x, y)
    }

    drawAutoScrollCursor(x: number, y: number, innerRadius: number, outterRadius: number) {
        this.clearScreen()

        this.drawCursor(x, y, innerRadius, outterRadius)
        this.drawTopTriangle(x, y)
        this.drawRightTriangle(x, y)
        this.drawBottomTriangle(x, y)
        this.drawLeftTriangle(x, y)
    }
}