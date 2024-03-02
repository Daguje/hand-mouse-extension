export default class EditGestureView {
    private gestureImageCaptureList: Array<HTMLImageElement> = []
    private gesturesCapturesPreviewsContainer: HTMLDivElement
    private startButton: HTMLButtonElement
    private finishButton: HTMLButtonElement
    private loopId: number

    constructor() {
        this.startButton = document.getElementById('start-capture-button') as HTMLButtonElement
        this.finishButton = document.getElementById('finish-capture-button') as HTMLButtonElement
        this.gesturesCapturesPreviewsContainer = document.getElementById('gestures-captures-previews-container') as HTMLDivElement
    }

    getCaptureList() {
        return this.gestureImageCaptureList
    }

    getCaptureListLength() {
        return this.gestureImageCaptureList.length
    }

    onStart(fn: () => void) {
        this.finishButton.disabled = true
        this.startButton.disabled = false
        this.startButton.addEventListener('click', fn.bind(this))
    }

    onRunning() {
        this.startButton.disabled = true
    }

    onDone(fn: () => Promise<void>) {
        this.finishButton.disabled = false
        this.startButton.disabled = true
        this.finishButton.addEventListener('click', fn.bind(this))
    }

    appendGesture(img: HTMLImageElement) {
        this.gestureImageCaptureList.push(img)
    }

    private createGestureCaptureImage(): HTMLImageElement {
        return document.createElement('img')
    }

    private createGestureImageCaptureCanvas(): HTMLCanvasElement {
        const canvas = document.createElement('canvas')
        canvas.width = 165
        canvas.height = 165

        return canvas
    }

    private getContext2D(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
        return canvas.getContext('2d')
    }

    capture(video: HTMLVideoElement): HTMLImageElement {
        const canvas = this.createGestureImageCaptureCanvas()
        const context = this.getContext2D(canvas)

        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const photo = this.createGestureCaptureImage()
        const data = canvas.toDataURL("image/png");
        photo.setAttribute('src', data)

        return photo
    }

    showCaptures() {
        this.gestureImageCaptureList.forEach(capture => {
            this.gesturesCapturesPreviewsContainer.appendChild(capture)
        })
    }

    loop(fn: FrameRequestCallback) {
        this.loopId = requestAnimationFrame(fn)
    }

    dispose() {
        this.gestureImageCaptureList = []
        cancelAnimationFrame(this.loopId)
    }
}