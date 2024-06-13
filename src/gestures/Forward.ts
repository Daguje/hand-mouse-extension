import { CursorDrawer } from "@lib/Cursor";
import { IGesture } from "./types";

export class Forward implements IGesture {
    timeToExecute = 0;

    draw(ctx: CanvasRenderingContext2D) {
        CursorDrawer.arcAtHandCenter(CursorDrawer.radii.xl, this.timeToExecute, ctx)
        CursorDrawer.leftTriangleAtHandCenter(CursorDrawer.radii.xl * 0.8,ctx)
    }

    canExecute(): boolean {
        return this.timeToExecute > 2 * Math.PI
    }

    execute() {
        if(this.canExecute()) {
            history.forward()
        } else {
            this.timeToExecute += 0.2;
        }
    }

    dispose(): void {
        this.timeToExecute = 0
    }
}