import { Arc } from "@lib/Shapes/arc"
import { Circle } from "@lib/Shapes/circle"
import { Circunference } from "@lib/Shapes/circunference"
import { CursorPosition, Triangle } from ".."

export class CursorDrawer {
    static colors = {
        primary: '#f7f7f7',
        secondary: '#383838'
    }

    static radii = {
        xl: 18,
        lg: 14,
        md: 10,
        sm: 8,
        xs: 4,
    }

    static circleAtHandCenter(radius: number, ctx: CanvasRenderingContext2D) {
        Circle.draw(CursorPosition.x, CursorPosition.y, radius, ctx, this.colors.primary, this.colors.secondary)
    }

    static circunferenceAtHandCenter(radius: number, ctx: CanvasRenderingContext2D) {
        Circunference.draw(CursorPosition.x, CursorPosition.y, radius, ctx, this.colors.primary, this.colors.secondary)
    }

    static arcAtHandCenter(radius: number, angle: number, ctx: CanvasRenderingContext2D) {
        Arc.draw(CursorPosition.x, CursorPosition.y, radius, angle, ctx, this.colors.primary, this.colors.secondary)
    }

    static rightTriangleAtHandCenter(height: number, ctx: CanvasRenderingContext2D) {
        const halfHeight = height / 2;
        
        const x1 = CursorPosition.x;
        const y1 = CursorPosition.y - halfHeight;

        const x2 = CursorPosition.x - halfHeight;
        const y2 = CursorPosition.y;

        const x3 = CursorPosition.x;
        const y3 = CursorPosition.y + halfHeight;

        Triangle.draw(x1, y1, x2, y2, x3, y3, ctx, this.colors.primary)
    }

    static rightTriangleAtCincunference(radius: number, ctx: CanvasRenderingContext2D) {
        Triangle.draw(CursorPosition.x + radius * 1.33, CursorPosition.y - radius * 0.33, CursorPosition.x + radius * 1.33, CursorPosition.y + radius * 0.33, CursorPosition.x + radius * 1.88, CursorPosition.y, ctx, this.colors.primary)
    }

    static leftTriangleAtHandCenter(height: number, ctx: CanvasRenderingContext2D) {
        const halfHeight = height / 2;
        
        const x1 = CursorPosition.x;
        const y1 = CursorPosition.y - halfHeight;

        const x2 = CursorPosition.x + halfHeight;
        const y2 = CursorPosition.y;

        const x3 = CursorPosition.x;
        const y3 = CursorPosition.y + halfHeight;

        Triangle.draw(x1, y1, x2, y2, x3, y3, ctx, this.colors.primary)
    }

    static leftTriangleAtCincunference(radius: number, ctx: CanvasRenderingContext2D) {
        Triangle.draw(CursorPosition.x - radius * 1.33, CursorPosition.y - radius * 0.33, CursorPosition.x - radius * 1.33, CursorPosition.y + radius * 0.33, CursorPosition.x - radius * 1.88, CursorPosition.y, ctx, this.colors.primary)
    }
    
    static bottomTriangleAtCincunference(radius: number, ctx: CanvasRenderingContext2D) {
        Triangle.draw(CursorPosition.x + radius * 0.33, CursorPosition.y + radius * 1.33, CursorPosition.x - radius * 0.33, CursorPosition.y + radius * 1.33, CursorPosition.x, CursorPosition.y + radius * 1.88, ctx, this.colors.primary)
    }

    static topTriangleAtCincunference(radius: number, ctx: CanvasRenderingContext2D) {
        Triangle.draw(CursorPosition.x + radius * 0.33, CursorPosition.y - radius * 1.33, CursorPosition.x - radius * 0.33, CursorPosition.y - radius * 1.33, CursorPosition.x, CursorPosition.y - radius * 1.88, ctx, this.colors.primary)
    }
}