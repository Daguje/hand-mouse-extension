import { staticImplements } from "@utils/staticImplements";
import { Arc } from "./arc";
import { IShape } from "./types";

@staticImplements<IShape>()
export class Circunference {
    static draw(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D, primaryColor: string, secondaryColor: string): void {
        Arc.draw(x, y, radius, 2 * Math.PI, ctx, primaryColor, secondaryColor);
    }
}