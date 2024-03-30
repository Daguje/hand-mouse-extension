import { Cursor } from "@lib/Cursor";
import { IGesture } from "./types";

export class Backward implements IGesture {
    draw(ctx: CanvasRenderingContext2D) {
        Cursor.innerCircle(Cursor.executingActionRadius, ctx)
        Cursor.outterCircle(ctx)
    }

    execute() {
        history.back()
    }
}