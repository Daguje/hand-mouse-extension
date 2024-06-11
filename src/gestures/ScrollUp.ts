import { CursorDrawer } from "@lib/Cursor";
import { IGesture } from "./types";

export class ScrollUp implements IGesture {
    draw(ctx: CanvasRenderingContext2D) {
        CursorDrawer.circleAtHandCenter(CursorDrawer.radii.xs, ctx)
        CursorDrawer.circunferenceAtHandCenter(CursorDrawer.radii.lg, ctx)
        CursorDrawer.topTriangleAtCincunference(CursorDrawer.radii.lg, ctx)
    }

    execute() {
        window.scrollBy(0, -30)
    }

    dispose(): void {
        return
    }
}