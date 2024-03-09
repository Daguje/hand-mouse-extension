export default class EditGestureView {
    private gestureImageCaptureList: Array<HTMLImageElement> = []
    private gesturesCapturesPreviewsContainer: HTMLDivElement
    private _startButton: HTMLButtonElement
    private _finishButton: HTMLButtonElement
    private _trainButton: HTMLButtonElement
    private loopId: number

    constructor() {
        this._startButton = document.getElementById('start-capture-button') as HTMLButtonElement
        this._finishButton = document.getElementById('finish-capture-button') as HTMLButtonElement
        this._trainButton = document.getElementById('train-model-button') as HTMLButtonElement
        this.gesturesCapturesPreviewsContainer = document.getElementById('gestures-captures-previews-container') as HTMLDivElement
        this.loopId = null
    }

    get startButton() {
        return this._startButton
    }

    get finishButton() {
        return this._finishButton
    }

    get trainButton() {
        return this._trainButton
    }

    getCaptureList() {
        return this.gestureImageCaptureList
    }

    getCaptureListLength() {
        return this.gestureImageCaptureList.length
    }

    onStart() {
        this.finishButton.disabled = true
        this.startButton.disabled = false
    }

    onRunning() {
        this.startButton.disabled = true
    }

    onDone() {
        this.finishButton.disabled = false
        this.startButton.disabled = true
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
        this.gesturesCapturesPreviewsContainer.innerHTML = ""
        cancelAnimationFrame(this.loopId)
    }
}