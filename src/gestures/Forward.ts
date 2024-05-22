import { Cursor } from "@lib/Cursor";
import { IGesture } from "./types";

export class Forward implements IGesture {
    timeToExecute = 0;

    draw(ctx: CanvasRenderingContext2D) {
        Cursor.innerCircle(Cursor.executingActionRadius, ctx)
        Cursor.arc(ctx, 18, this.timeToExecute)
        ctx.lineWidth = 2
        ctx.strokeStyle = '#f7f7f7'
        ctx.stroke()
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