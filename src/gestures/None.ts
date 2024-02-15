import { Cursor } from "@lib/Cursor";
import { IGesture } from "./types";

export class None implements IGesture {
    draw(ctx: CanvasRenderingContext2D) {
        Cursor.innerCircle(Cursor.baseRadius, ctx)
        Cursor.outterCircle(ctx)
    }

    execute() {
        // nada
    }
}