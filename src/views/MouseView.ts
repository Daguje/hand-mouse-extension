import { GesturesDef, IGesture } from "@gestures/types";
import { Keypoint } from "@tensorflow-models/hand-pose-detection";
import { Point } from "../types";

interface IMouseViewProps {
    gestures: Partial<Record<GesturesDef, IGesture>>
}

export default class MouseView {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private gestures: Partial<Record<GesturesDef, IGesture>>

    constructor({ gestures }: IMouseViewProps) {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        
        this.canvas.id = 'hand-mouse-canvas'
        this.canvas.width = globalThis.screen.availWidth
        this.canvas.height = globalThis.screen.availHeight
        
        this.canvas.style.pointerEvents = 'none'
        this.canvas.style.position = 'fixed'
        this.canvas.style.top = '0'
        this.canvas.style.left = '0'
        this.canvas.style.zIndex = '2147483647'
        
        document.body.appendChild(this.canvas)

        this.gestures = gestures
    }

    private clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawCursor(gesture: GesturesDef, handCenter: Point) {
        this.clearCanvas()
        this.gestures[gesture].draw({ ...handCenter }, this.ctx)
    }

    // private keypointMovingAvarage(data: Array<Keypoint>, window: number): Keypoint {
    //     const sum = data.reduce((previousSamples, currentSample) => {
    //         previousSamples.x = previousSamples.x + currentSample.x
    //         previousSamples.y = previousSamples.y + currentSample.y

    //         return previousSamples
    //     }, { x: 0, y: 0 })

    //     const x = sum.x / window
    //     const y = sum.y / window

    //     return { x, y }
    // }

    // private smoothHandShake(cursor: Keypoint): Keypoint {
    //     this.lastSamples.push(cursor)
    //     let averagedCursor = cursor
    //     const window = 3

    //     if (this.lastSamples.length < window) return averagedCursor

    //     averagedCursor = this.keypointMovingAvarage(this.lastSamples, window)

    //     cursor.x = averagedCursor.x
    //     cursor.y = averagedCursor.y

    //     this.lastSamples.shift() 

    //     return averagedCursor
    // }

    // private getClickableElementPosition(cursor: Keypoint) {
    //     const neighborhood = 38
    //     for (let x = cursor.x - neighborhood; x <= cursor.x + neighborhood; x++) {
    //         for (let y = cursor.y - neighborhood; y <= cursor.y + neighborhood; y++) {
    //             const element = document.elementFromPoint(cursor.x, cursor.y)
    //             const clickableTagElements = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'SUMMARY']
    //             if (element && (clickableTagElements.includes(element.tagName) || clickableTagElements.includes(element.parentElement?.tagName))) {
    //                 const rect = element.getBoundingClientRect()
    //                 cursor.x = rect.x + rect.width / 2
    //                 cursor.y = rect.y + rect.height / 2
    //             }
    //         }
    //     }
    //     return cursor
    // }

    // private normalizeHandCenterPosition(cursor: Keypoint): Keypoint {
    //     const xRatio = this.canvas.width / this.video.width
    //     const yRatio = this.canvas.height / this.video.height
    
    //     cursor.x = 2 * (cursor.x * xRatio - this.video.width / 2)
    //     cursor.y = 2 * (cursor.y * yRatio- this.video.height / 2)

    //     return cursor
    // }

    loop(fn: FrameRequestCallback) {
        requestAnimationFrame(fn)
    }
}