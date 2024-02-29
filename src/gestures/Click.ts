import { Cursor } from "../lib/Cursor";
import { IGesture } from "./types";

export class Click implements IGesture {
    draw(ctx: CanvasRenderingContext2D) {
        Cursor.innerCircle(Cursor.executingActionRadius, ctx)
        Cursor.outterCircle(ctx)
    }

    execute() {
        const { x, y } = Cursor.getCursor()
        const element = document.elementFromPoint(x, y)

        this.fireClickEvent(element)
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