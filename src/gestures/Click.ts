import { Cursor } from "../lib/Cursor";
import { IGesture } from "./types";

export class Click implements IGesture {
    timeToExecute = Cursor.baseRadius;

    draw(ctx: CanvasRenderingContext2D) {
        Cursor.innerCircle(this.timeToExecute, ctx)
        Cursor.outterCircle(ctx)
    }

    canExecute(): boolean {
        return this.timeToExecute < Cursor.executingActionRadius;
    }

    execute() {
        try {
            if(this.canExecute()) {
                const { x, y } = Cursor.getCursor()
                
                if (!Number.isFinite(x)) return
                if (!Number.isFinite(y)) return
    
                const element = document.elementFromPoint(x, y)
                
                this.fireClickEvent(element)
            } else {
                this.timeToExecute -= 0.8;
            }
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

    dispose(): void {
        this.timeToExecute = Cursor.baseRadius
    }
}