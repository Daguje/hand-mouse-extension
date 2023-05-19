import { Hand, Keypoint } from "@tensorflow-models/hand-pose-detection";
import { estimateGesture } from "../HandDetector/utils";

export class Cursor {
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
          
        this.drawKeypoint(hand.keypoints, hand.handedness)
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

    drawKeypoint(keypoints: Array<Keypoint>, handedness: 'Left' | 'Right') {
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
        this.drawCursor(cursor.x, cursor.y, 8)
        for (let i = 0; i < estimatedGestures.length; i++) {
            if (estimatedGestures[i].name === 'thumbs_up' && estimatedGestures[i].score > 9) {
                console.log('Thumbs up!')
                this.drawFreeMoveCursor(cursor.x, cursor.y, 8)
            }
            else if (estimatedGestures[i].name === 'victory' && estimatedGestures[i].score > 9) {
                console.log('victory!')
            }
            else if (estimatedGestures[i].name === 'thumbs_down' && estimatedGestures[i].score > 9) {
                console.log('thumbs down!')
            }
            else if (estimatedGestures[i].name === 'faz_o_L' && estimatedGestures[i].score > 9) {
                console.log('faz o L!')
                this.drawPinchCursor(cursor.x, cursor.y, 8)
            }
        }
    }

    drawCursor(x: number, y: number, radius: number){
        this.clearScreen()

        this.ctx.beginPath()
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI)
        this.ctx.fill()


        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius + 8, 0, 2 * Math.PI)
        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawPinchCursor(x: number, y: number, radius: number) {
        this.clearScreen()

        this.ctx.beginPath()
        this.ctx.arc(x, y, radius - 4, 0, 2 * Math.PI)
        this.ctx.fill()


        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius + 8, 0, 2 * Math.PI)
        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawFreeMoveCursor(x: number, y: number, radius: number) {
        this.clearScreen()

        this.ctx.beginPath()
        this.ctx.arc(x, y, radius - 4, 0, 2 * Math.PI)
        this.ctx.fill()

        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius + 8, 0, 2 * Math.PI)
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(x + 32, y);
        this.ctx.lineTo(x + 25, y - 8);
        this.ctx.lineTo(x + 25, y + 8);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.moveTo(x - 32, y);
        this.ctx.lineTo(x - 25, y - 8);
        this.ctx.lineTo(x - 25, y + 8);
        this.ctx.fill();
    }
}