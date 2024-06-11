import { CursorDrawer, CursorPosition } from "@lib/Cursor";
import { Point } from "../types";
import { IGesture } from "./types";

export class FreeMove implements IGesture {
    private fixedPoint: Point = null

    draw(ctx: CanvasRenderingContext2D) {
        CursorDrawer.circleAtHandCenter(CursorDrawer.radii.xs, ctx)
        CursorDrawer.circunferenceAtHandCenter(CursorDrawer.radii.lg ,ctx)
        CursorDrawer.topTriangleAtCincunference(CursorDrawer.radii.lg, ctx)
        CursorDrawer.rightTriangleAtCincunference(CursorDrawer.radii.lg, ctx)
        CursorDrawer.bottomTriangleAtCincunference(CursorDrawer.radii.lg, ctx)
        CursorDrawer.leftTriangleAtCincunference(CursorDrawer.radii.lg, ctx)

        if (this.fixedPoint == null) {
            this.fixedPoint = CursorPosition.getCursor()
        }
    }
    
    execute() {
        const { x, y } = CursorPosition.getCursor()
        const deltaX = x - this.fixedPoint.x 
        const deltaY =  y - this.fixedPoint.y

        window.scrollBy(deltaX, deltaY)
    }

    dispose(): void {
        this.fixedPoint = null
    }
}