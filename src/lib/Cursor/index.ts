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
        const x = position.x
        const y = position.y
        const clickableTagElements = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'SUMMARY']

        if (!Number.isFinite(x)) return position
        if (!Number.isFinite(y)) return position

        const element = document.elementFromPoint(x, y)

        if(!element) return position

        const isClickableElement = 
            clickableTagElements.includes(element.tagName) ||
            clickableTagElements.includes(element.parentElement?.tagName) ||
            clickableTagElements.includes(element.role?.toUpperCase()) 

        if(!isClickableElement) return position

        for (let i = x - neighborPixels; i <= x + neighborPixels; i++) {
            for (let j = y - neighborPixels; j <= y + neighborPixels; j++) {
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

        this.arc(ctx, radius, 2 * Math.PI)
        
        ctx.lineWidth = 1
        ctx.strokeStyle = this.secondaryColor
        ctx.stroke()

        ctx.fill()
    }

    static arc(ctx: CanvasRenderingContext2D, radius: number, angle: number) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, radius, 0, angle)
    }

    static outterCircle(ctx: CanvasRenderingContext2D) {
        this.arc(ctx, 18, 2 * Math.PI)

        ctx.lineWidth = 2
        ctx.strokeStyle = this.primaryColor
        ctx.stroke()

        this.arc(ctx, 18, 2 * Math.PI)

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
}