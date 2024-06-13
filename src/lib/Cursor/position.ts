import { Point } from "../../types";

export class CursorPosition {
    static x: number
    static y: number

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
}