import { staticImplements } from "@utils/staticImplements";
import { Circunference } from "./circunference";
import { IStaticShape } from "./types";

@staticImplements<IStaticShape>()
export class Circle {
    static draw(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D, primaryColor: string, secondaryColor: string) {
        Circunference.draw(x, y, radius, ctx, primaryColor, secondaryColor);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = primaryColor
        ctx.fill();
    }
}