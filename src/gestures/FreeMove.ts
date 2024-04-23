import { Cursor } from "@lib/Cursor";
import { checkEventCanExecute } from "@utils/checkEventCanExecute";
import { Point } from "../types";
import { IGesture } from "./types";

const { shouldExecute } = checkEventCanExecute(100)

export class FreeMove implements IGesture {
    lastPosition: Point = { x: 0, y: 0 }

    draw(ctx: CanvasRenderingContext2D) {
        Cursor.innerCircle(Cursor.executingActionRadius, ctx)
        Cursor.outterCircle(ctx)
        Cursor.topTriangle(ctx)
        Cursor.rightTriangle(ctx)
        Cursor.bottomTriangle(ctx)
        Cursor.leftTriangle(ctx)

        if(!shouldExecute()) return

        this.lastPosition = Cursor.getCursor()
    }
    
    execute() {
        const { x, y } = Cursor.getCursor()

        if (this.lastPosition.y > y) {
            window.scrollBy(0, - (this.lastPosition.y - y) * 100 / 10)
        } else if (this.lastPosition.y < y) {
            window.scrollBy(0, (y - this.lastPosition.y) / 10)
        }

        if(this.lastPosition.x > x) {
            window.scrollBy(-(this.lastPosition.x - x) * 100/ 10, 0)
        } else if(this.lastPosition.x < x) {
            window.scrollBy((x - this.lastPosition.x) / 10, 0)
        }
    }
}