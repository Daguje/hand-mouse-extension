export default class MouseView {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    private clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawCursor() {
        //console.log('Desenhando o Cursor')
    }

    loop(fn: FrameRequestCallback) {
        requestAnimationFrame(fn)
    }

    private setup() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.id = 'hand-mouse-canvas'
        this.canvas.width = globalThis.screen.availWidth
        this.canvas.height = globalThis.screen.availHeight
        
        this.canvas.style.pointerEvents = 'none'
        this.canvas.style.position = 'fixed'
        this.canvas.style.top = '0'
        this.canvas.style.left = '0'
        this.canvas.style.zIndex = '2147483647'

        document.body.appendChild(this.canvas)
    }

    static initialize() {
        const mouseView = new MouseView()
        mouseView.setup()

        return mouseView
    }
}