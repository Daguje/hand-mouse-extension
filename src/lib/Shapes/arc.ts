import { staticImplements } from "@utils/staticImplements";
import { IStaticShape } from "./types";

@staticImplements<IStaticShape>()
export class Arc {
    static draw(x: number, y: number, radius: number, angle: number, ctx: CanvasRenderingContext2D, primaryColor: string, secondaryColor: string) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, angle);
        ctx.lineWidth = 6;
        ctx.strokeStyle = secondaryColor;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, angle);
        ctx.lineWidth = 2;
        ctx.strokeStyle = primaryColor;
        ctx.stroke();
    }
}