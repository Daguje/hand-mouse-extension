import { Cursor } from "@lib/Cursor";
import { Point } from "../types";
import { IGesture } from "./types";

export class None implements IGesture {
    draw(handCenter: Point, ctx: CanvasRenderingContext2D) {
        console.log(Cursor.baseRadius)
        Cursor.innerCircle(handCenter, Cursor.baseRadius, ctx)
        Cursor.outterCircle(handCenter, ctx)
    }
}