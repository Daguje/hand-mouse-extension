import { Point } from "../types"

export enum GesturesDef {
    Click = 'click',
    ScrollUp = 'scrollUp',
    ScrollDown = 'scrollDown',
    FreeMove = 'freeMove',
    GoBack = 'goBack',
    None = 'none'
}

export interface IGesture {
    draw(handCenter: Point, c: CanvasRenderingContext2D): void
    execute?(...args: any[]): void
}
