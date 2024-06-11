import { staticImplements } from "@utils/staticImplements"
import { IStaticShape } from "./types"

@staticImplements<IStaticShape>()
export class Triangle {
    static draw(x1: number, y1: number, x2: number, y2: number, xOff: number, yOff: number, ctx: CanvasRenderingContext2D, primaryColor: string, secondaryColor: string) {
        ctx.beginPath()
        ctx.moveTo(xOff, yOff)
        ctx.lineTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.closePath()
        
        ctx.lineWidth = 1
        ctx.strokeStyle = primaryColor
        ctx.stroke()

        ctx.fill()
    }
}