export enum GesturesDef {
    Click = 0,
    ScrollUp = 1,
    ScrollDown = 2,
    FreeMove = 3,
    GoBack = 4,
    None = 5
}

export const gesturePortugueseTranslateMap: { [key: number]: string } = {
    [GesturesDef.Click]: 'Clique',
    [GesturesDef.ScrollUp]: 'Rolar para cima',
    [GesturesDef.ScrollDown]: 'Rolar para baixo',
    [GesturesDef.FreeMove]: 'Mover Livremente',
    [GesturesDef.None]: 'Nenhum',
}

export const gestureNameMap: { [key: number]: string } = {
    [GesturesDef.Click]: 'click',
    [GesturesDef.ScrollUp]: 'scrollUp',
    [GesturesDef.ScrollDown]: 'scrollDown',
    [GesturesDef.FreeMove]: 'freeMove',
    [GesturesDef.None]: 'none',
}


export interface IGesture {
    draw(ctx: CanvasRenderingContext2D): void
    execute(): void
}
