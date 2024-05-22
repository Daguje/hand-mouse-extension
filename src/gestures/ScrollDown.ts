import { Cursor } from "@lib/Cursor";
import { IGesture } from "./types";

export class ScrollDown implements IGesture {
    draw(ctx: CanvasRenderingContext2D) {
        Cursor.innerCircle(Cursor.executingActionRadius, ctx)
        Cursor.outterCircle(ctx)
        Cursor.bottomTriangle(ctx)
    }

    execute() {
        window.scrollBy(0, 30)
    }

    dispose(): void {
        return
    }
}