import { Cursor } from "@lib/Cursor";
import { checkEventCanExecute } from "@utils/checkEventCanExecute";
import { Point } from "../types";
import { IGesture } from "./types";

const { shouldExecute } = checkEventCanExecute(300)

export class FreeMove implements IGesture {
    private static fixedPoint: Point = { x: 0, y: 0 }

    draw(ctx: CanvasRenderingContext2D) {
        Cursor.innerCircle(Cursor.executingActionRadius, ctx)
        Cursor.outterCircle(ctx)
        Cursor.topTriangle(ctx)
        Cursor.rightTriangle(ctx)
        Cursor.bottomTriangle(ctx)
        Cursor.leftTriangle(ctx)

        if (!shouldExecute())

        FreeMove.fixedPoint = Cursor.getCursor()
    }
    
    execute() {
        const { x, y } = Cursor.getCursor()
        const distX = x - FreeMove.fixedPoint.x 
        const distY =  y - FreeMove.fixedPoint.y
        const mag2 = distX * distX + distY * distY

        console.log({distX})
        console.log({distY})

        if (FreeMove.fixedPoint.y > y) {
            window.scrollBy(0, -distY / 10)
        } else if (FreeMove.fixedPoint.y < y) {
            window.scrollBy(0, distY / 10)
        }

        if(FreeMove.fixedPoint.x > x) {
            window.scrollBy(-distX / 10, 0)
        } else if(FreeMove.fixedPoint.x < x) {
            window.scrollBy(distX / 10, 0)
        }
    }
}