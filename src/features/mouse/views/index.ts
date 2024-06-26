import { GesturesStringDef, IGesture } from "@gestures/types";
import { CursorPosition } from "@lib/Cursor";
import { Point } from "../../../types";

interface IMouseViewProps {
    gestures: Partial<Record<GesturesStringDef, IGesture>>
}

export default class MouseView {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private gestures: Partial<Record<GesturesStringDef, IGesture>>

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

    drawCursor(gesture: GesturesStringDef, handCenter: Point) {
        this.clearCanvas()
        CursorPosition.setCursor(handCenter)
        this.gestures[gesture].draw(this.ctx)   
    }

    execute(gesture: GesturesStringDef) {
        this.gestures[gesture].execute()
    }

    diposeGesture(gesture: GesturesStringDef) {
        this.gestures[gesture].dispose()
    }

    loop(fn: FrameRequestCallback) {
        requestAnimationFrame(fn)
    }
}