import { Cursor } from "../lib/Cursor";
import { IGesture } from "./types";

export class Click implements IGesture {
    draw(ctx: CanvasRenderingContext2D) {
        Cursor.innerCircle(Cursor.executingActionRadius, ctx)
        Cursor.outterCircle(ctx)
    }

    execute() {
        try {
            const { x, y } = Cursor.getCursor()
            
            if (!Number.isFinite(x)) return
            if (!Number.isFinite(y)) return

            const element = document.elementFromPoint(x, y)
    
            this.fireClickEvent(element)
        } catch (e) {
            console.error(`Não foi possível executar o gesto de clique: ${e}`)
        }
    }

    private fireClickEvent(element: Element) {
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        })
        element?.dispatchEvent(event)
    }
}