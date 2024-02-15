import { Cursor } from "@lib/Cursor";
import { IGesture } from "./types";

export class ScrollUp implements IGesture {
    draw(ctx: CanvasRenderingContext2D) {
        Cursor.innerCircle(Cursor.executingActionRadius, ctx)
        Cursor.outterCircle(ctx)
        Cursor.topTriangle(ctx)
    }

    execute() {
        window.scrollBy(0, -10)
    }
}