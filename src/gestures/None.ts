import { CursorDrawer } from "@lib/Cursor";
import { IGesture } from "./types";

export class None implements IGesture {
    draw(ctx: CanvasRenderingContext2D) {
        CursorDrawer.circleAtHandCenter(CursorDrawer.radii.md, ctx)
        CursorDrawer.circunferenceAtHandCenter(CursorDrawer.radii.xl, ctx)
    }

    execute() {
        return
    }

    dispose(): void {
        return
    }
}