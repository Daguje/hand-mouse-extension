import { Point } from "../../types";

export class Cursor {
    private static primaryColor = '#f7f7f7'
    private static secondaryColor = '#383838'
    static baseRadius = 10
    static executingActionRadius = 8

    private static x: number
    private static y: number

    private static stickToClickableElement(handCenter: Point) {
        const neighborPixels = 64
        const position: Point = handCenter
        const clickableTagElements = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'SUMMARY']
        const element = document.elementFromPoint(handCenter.x, handCenter.y)

        if(!element) return position

        const isClickableElement = 
            clickableTagElements.includes(element.tagName) ||
            clickableTagElements.includes(element.parentElement?.tagName) ||
            clickableTagElements.includes(element.role?.toUpperCase()) 

        if(!isClickableElement) return position

        for (let x = handCenter.x - neighborPixels; x <= handCenter.x + neighborPixels; x++) {
            for (let y = handCenter.y - neighborPixels; y <= handCenter.y + neighborPixels; y++) {
                const rect = element.getBoundingClientRect()
                position.x = rect.x + rect.width / 2
                position.y = rect.y + rect.height / 2
            }
        }

        return position
    }

    static setCursor(handCenter: Point) {
        const { x, y } = this.stickToClickableElement(handCenter)

        this.x = x
        this.y = y
    }

    static getCursor() {
        return {
            x: this.x,
            y: this.y
        }
    }

    static innerCircle(radius: number, ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.primaryColor
        ctx.strokeStyle = this.secondaryColor
        ctx.lineWidth = 2

        ctx.beginPath()
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI)
        ctx.closePath()
        
        ctx.lineWidth = 1
        ctx.strokeStyle = this.secondaryColor
        ctx.stroke()

        ctx.fill()
    }

    static outterCircle(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 18, 0, 2 * Math.PI)
        ctx.closePath()

        ctx.lineWidth = 2
        ctx.strokeStyle = this.primaryColor
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(this.x, this.y, 18, 0, 2 * Math.PI)
        ctx.closePath()

        ctx.lineWidth = 4
        ctx.strokeStyle = this.secondaryColor
    }

    private static triangle(x1: number, y1: number, x2: number, y2: number, xOff: number, yOff: number, ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.moveTo(xOff, yOff)
        ctx.lineTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.closePath()
        
        ctx.lineWidth = 1
        ctx.strokeStyle = this.secondaryColor
        ctx.stroke()

        ctx.fill()
    }

    static topTriangle(ctx: CanvasRenderingContext2D) {
        this.triangle(this.x + 6, this.y - 24, this.x - 6, this.y - 24, this.x, this.y - 34, ctx)
    }

    static rightTriangle(ctx: CanvasRenderingContext2D) {
        this.triangle(this.x + 24, this.y - 6, this.x + 24, this.y + 6, this.x + 34, this.y, ctx)
    }
    
    static bottomTriangle(ctx: CanvasRenderingContext2D) {
        this.triangle(this.x + 6, this.y + 24, this.x - 6, this.y + 24, this.x, this.y + 34, ctx)
    }

    static leftTriangle(ctx: CanvasRenderingContext2D) {
        this.triangle(this.x - 24, this.y - 6, this.x - 24, this.y + 6, this.x - 34, this.y, ctx)
    }
//   video: HTMLVideoElement
//   canvas: HTMLCanvasElement
//   ctx: CanvasRenderingContext2D
//   baseRadius: number
//   outterRadius: number
//   shrinkFactor: number
//   strokeColor: string
//   fillColor: string
//   gestureDetected: boolean
//   lastPosition: {x: number, y: number}
//   isRunning: boolean
//   lastSamples: Array<Keypoint>

//   constructor({ video, canvas, ctx }: ICursorProps) {
//         this.lastPosition = { x: 0, y: 0 }
//         this.isRunning = true
//         this.video = video
//         this.canvas = canvas
//         this.ctx =  ctx
//         this.ctx.globalCompositeOperation = "destination-over";

//         this.baseRadius = 10
//         this.outterRadius = 18
//         this.shrinkFactor = 0.75
//         this.gestureDetected = false

//         this.strokeColor = 
//         this.fillColor = '#f7f7f7'

//         this.lastSamples = []
//     }

//     drawHands(hands: Array<Hand>) {
//         if (!hands.length) return

//         for(let i = 0; i < hands.length; i++) {
//             this.drawHand(hands[i])
//         }
//     }

//     private clearScreen() {
//         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     }

//     private drawHand(hand: Hand) {
//         if(!hand.keypoints) return
          
//         this.drawHandCenter(hand.keypoints)
//     }

//     private getHandCenter(keypoints: Array<Keypoint>): Keypoint {
//         const wrist = keypoints[0]
//         const indexFingerMCP = keypoints[5]
//         const middleFingerMCP = keypoints[9]
//         const ringFingerMCP = keypoints[13]
//         const fingerMCP = keypoints[17]

//         const x = (wrist.x + indexFingerMCP.x + middleFingerMCP.x + ringFingerMCP.x + fingerMCP.x) / 5
//         const y = (wrist.y + indexFingerMCP.y + middleFingerMCP.y + ringFingerMCP.y + fingerMCP.y) / 5
//         const handCenter: Keypoint = { x, y }

//         return handCenter
//     }

//     private keypointMovingAvarage(data: Array<Keypoint>, window: number): Keypoint {
//         const sum = data.reduce((previousSamples, currentSample) => {
//             previousSamples.x = previousSamples.x + currentSample.x
//             previousSamples.y = previousSamples.y + currentSample.y

//             return previousSamples
//         }, { x: 0, y: 0 })

//         const x = sum.x / window
//         const y = sum.y / window

//         return { x, y }
//     }

//     private smoothHandShake(cursor: Keypoint): Keypoint {
//         this.lastSamples.push(cursor)
//         let averagedCursor = cursor
//         const window = 3

//         if (this.lastSamples.length < window) return averagedCursor

//         averagedCursor = this.keypointMovingAvarage(this.lastSamples, window)

//         cursor.x = averagedCursor.x
//         cursor.y = averagedCursor.y

//         this.lastSamples.shift() 

//         return averagedCursor
//     }

//     private normalizeHandCenterPosition(cursor: Keypoint): Keypoint {
//         const xRatio = this.canvas.width / this.video.width
//         const yRatio = this.canvas.height / this.video.height
    
//         cursor.x = 2 * (cursor.x * xRatio - this.video.width / 2)
//         cursor.y = 2 * (cursor.y * yRatio- this.video.height / 2)

//         return cursor
//     }

//     private drawHandCenter(keypoints: Array<Keypoint>) {
//         let cursor = this.getHandCenter(keypoints)

//         cursor = this.smoothHandShake(cursor)
//         cursor = this.normalizeHandCenterPosition(cursor)
//         cursor = this.getClickableElementPosition(cursor)
        
//         const estimatedGestures = estimateGesture(keypoints)
//         this.gestureDetected = !!estimatedGestures.length
//         this.drawCursor(cursor.x, cursor.y, this.baseRadius, this.outterRadius)
//         if(estimatedGestures.length === 0){
//             this.isRunning = true
//         }

//         for(let i = 0; i < estimatedGestures.length; i++) {
//             if (estimatedGestures[i].score < 9) continue
//             let element
//             switch(estimatedGestures[i].name) {
//                 case 'closedHandGesture':
//                     this.drawAutoScrollCursor(cursor.x, cursor.y, this.baseRadius, this.outterRadius)
//                     if (this.isRunning) {
//                         this.lastPosition = cursor
//                         this.isRunning = false
//                     }
//                     scrollTo(cursor.x, cursor.y, this.lastPosition)
//                     break;
//                 case 'okGesture':
//                     this.drawClickCursor(cursor.x, cursor.y, this.baseRadius, this.outterRadius)
//                     if (this.isRunning) {
//                         element = document.elementFromPoint(cursor.x, cursor.y)
//                         element.scrollLeft
//                         clickEvent(element)
//                         this.isRunning = false
//                     }
//                     break;
//                 case 'fingerUp':
//                     scrollUp()
//                     break;
//                 case 'fingerDown':
//                     scrollDown()
//                     break;
//                 default:
//                     console.log('Nada')
//             }
//         }
//     }

//     private drawCursor(x: number, y: number, innerRadius: number, outterRadius: number){
//         if(!this.gestureDetected) {
//             if(this.baseRadius < 8){
//                 this.baseRadius *= 1 + this.shrinkFactor
//             }
//         }

//         this.clearScreen()

//         this.ctx.fillStyle = this.fillColor
//         this.ctx.strokeStyle = this.fillColor
//         this.ctx.lineWidth = 2

//         this.ctx.beginPath()
//         this.ctx.arc(x, y, innerRadius, 0, 2 * Math.PI)
//         this.ctx.closePath()
        
//         this.ctx.lineWidth = 1
//         this.ctx.strokeStyle = this.strokeColor
//         this.ctx.stroke()

//         this.ctx.fill()
        
//         this.ctx.beginPath()
//         this.ctx.arc(x, y, outterRadius, 0, 2 * Math.PI)
//         this.ctx.closePath()

//         this.ctx.lineWidth = 2
//         this.ctx.strokeStyle = this.fillColor
//         this.ctx.stroke()

//         this.ctx.beginPath()
//         this.ctx.arc(x, y, outterRadius, 0, 2 * Math.PI)
//         this.ctx.closePath()

//         this.ctx.lineWidth = 4
//         this.ctx.strokeStyle = this.strokeColor
//         this.ctx.stroke()
//     }

//     private drawClickCursor(x: number, y: number, innerRadius: number, outterRadius: number) {
//         if(this.baseRadius > 4) this.baseRadius *= this.shrinkFactor

//         this.drawCursor(x, y, innerRadius, outterRadius)
//     }

//     private drawScrollUpCursor(x: number, y: number, innerRadius: number, outterRadius: number) {
//         this.clearScreen()

//         this.drawClickCursor(x, y, innerRadius, outterRadius)
//         this.drawTopTriangle(x, y)
//     }

//     private drawScrollRightCursor(x: number, y: number, innerRadius: number, outterRadius: number) {
//         this.clearScreen()

//         this.drawClickCursor(x, y, innerRadius, outterRadius)
//         this.drawRightTriangle(x, y)
//     }

//     private drawScrollDownCursor(x: number, y: number, innerRadius: number, outterRadius: number) {
//         this.clearScreen()

//         this.drawClickCursor(x, y, innerRadius, outterRadius)
//         this.drawBottomTriangle(x, y)
//     }

//     private drawScrollLeftCursor(x: number, y: number, innerRadius: number, outterRadius: number) {
//         this.clearScreen()

//         this.drawClickCursor(x, y, innerRadius, outterRadius)
//         this.drawLeftTriangle(x, y)
//     }

//     private drawAutoScrollCursor(x: number, y: number, innerRadius: number, outterRadius: number) {
//         if(this.baseRadius > 4) this.baseRadius *= this.shrinkFactor

//         this.clearScreen()

//         this.drawClickCursor(x, y, innerRadius, outterRadius)
//         this.drawTopTriangle(x, y)
//         this.drawRightTriangle(x, y)
//         this.drawBottomTriangle(x, y)
//         this.drawLeftTriangle(x, y)
//     }
}