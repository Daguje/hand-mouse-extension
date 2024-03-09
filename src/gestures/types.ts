export enum GesturesDef {
    Click = 0,
    ScrollUp = 1,
    ScrollDown = 2,
    FreeMove = 3,
    Backward = 4,
    Forward = 5,
    None = 6
}

export enum GesturesStringDef {
    Click = 'click',
    ScrollUp = 'scrollUp',
    ScrollDown = 'scrollDown',
    FreeMove = 'freeMove',
    Backward = 'backward',
    Forward = 'forward',
    None = 'none'
}

export const gesturePortugueseTranslateMap: { [key: number]: string } = {
    [GesturesDef.Click]: 'Clique',
    [GesturesDef.ScrollUp]: 'Rolar para cima',
    [GesturesDef.ScrollDown]: 'Rolar para baixo',
    [GesturesDef.FreeMove]: 'Mover Livremente',
    [GesturesDef.Backward]: 'Voltar Para Trás',
    [GesturesDef.Forward]: 'Voltar Para Frente',
    [GesturesDef.None]: 'Nenhum',
}

export const gestureNameMap: { [key: number]: string } = {
    [GesturesDef.Click]: GesturesStringDef.Click,
    [GesturesDef.ScrollUp]: GesturesStringDef.ScrollUp,
    [GesturesDef.ScrollDown]: GesturesStringDef.ScrollDown,
    [GesturesDef.FreeMove]: GesturesStringDef.FreeMove,
    [GesturesDef.Backward]: GesturesStringDef.Backward,
    [GesturesDef.Forward]: GesturesStringDef.Forward,
    [GesturesDef.None]: GesturesStringDef.None,
}


export interface IGesture {
    draw(ctx: CanvasRenderingContext2D): void
    execute(): void
}
