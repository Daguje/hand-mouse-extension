import { Cursor } from "@lib/Cursor";
import { Point } from "../types";
import { IGesture } from "./types";

export class FreeMove implements IGesture {
    private fixedPoint: Point = null

    draw(ctx: CanvasRenderingContext2D) {
        Cursor.innerCircle(Cursor.executingActionRadius, ctx)
        Cursor.outterCircle(ctx)
        Cursor.topTriangle(ctx)
        Cursor.rightTriangle(ctx)
        Cursor.bottomTriangle(ctx)
        Cursor.leftTriangle(ctx)

        if (this.fixedPoint == null) {
            this.fixedPoint = Cursor.getCursor()
        }
    }
    
    execute() {
        const { x, y } = Cursor.getCursor()
        const deltaX = x - this.fixedPoint.x 
        const deltaY =  y - this.fixedPoint.y

        window.scrollBy(deltaX, deltaY)
    }

    dispose(): void {
        this.fixedPoint = null
    }
}