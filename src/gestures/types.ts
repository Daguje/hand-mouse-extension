export enum GesturesDef {
    Click = 'click',
    ScrollUp = 'scrollUp',
    ScrollDown = 'scrollDown',
    FreeMove = 'freeMove',
    GoBack = 'goBack',
    None = 'none'
}

export interface IGesture {
    draw(ctx: CanvasRenderingContext2D): void
    execute(): void
}
