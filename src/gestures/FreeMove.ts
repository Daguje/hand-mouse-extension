import { Cursor } from "@lib/Cursor";
import { Point } from "../types";
import { IGesture } from "./types";

export class FreeMove implements IGesture {
    draw(handCenter: Point, ctx: CanvasRenderingContext2D) {
        Cursor.innerCircle(handCenter, Cursor.executingActionRadius, ctx)
        Cursor.outterCircle(handCenter, ctx)
    }

    execute(...args: any[]) {
        // executar a ação
    }
}