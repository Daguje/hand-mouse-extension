import { CursorDrawer, CursorPosition } from "../lib/Cursor";
import { IGesture } from "./types";

export class Click implements IGesture {
    timeToExecute = CursorDrawer.radii.md;

    draw(ctx: CanvasRenderingContext2D) {
        CursorDrawer.circleAtHandCenter(this.timeToExecute, ctx)
        CursorDrawer.circunferenceAtHandCenter(CursorDrawer.radii.xl, ctx)
    }

    canExecute(): boolean {
        return this.timeToExecute < CursorDrawer.radii.xs;
    }

    execute() {
        try {
            if(this.canExecute()) {
                const { x, y } = CursorPosition.getCursor()
                
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
        this.timeToExecute = CursorDrawer.radii.md
    }
}