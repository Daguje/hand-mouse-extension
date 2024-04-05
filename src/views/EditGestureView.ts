import { Constants } from "@lib/constants"

export default class EditGestureView {
    private gestureImageCaptureList: Array<HTMLImageElement> = []
    private gesturesCapturesPreviewsContainer: HTMLDivElement
    private captureCount: HTMLSpanElement
    private _startButton: HTMLButtonElement
    private _finishButton: HTMLButtonElement
    private _trainButton: HTMLButtonElement
    private _editButtons: HTMLCollectionOf<HTMLButtonElement>
    private _progressBar: HTMLDivElement
    private loopId: number

    constructor() {
        this._startButton = document.getElementById('start-capture-button') as HTMLButtonElement
        this._finishButton = document.getElementById('finish-capture-button') as HTMLButtonElement
        this._trainButton = document.getElementById('train-model-button') as HTMLButtonElement
        this._editButtons = document.getElementsByClassName('edit-button') as HTMLCollectionOf<HTMLButtonElement>
        this._progressBar = document.getElementById('progress-bar') as HTMLDivElement
        this.gesturesCapturesPreviewsContainer = document.getElementById('gestures-captures-previews-container') as HTMLDivElement
        this.captureCount = document.getElementById('capture-count') as HTMLSpanElement
        this.loopId = null

        this._startButton.disabled = true
        this._finishButton.disabled = true
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

    get editButtons() {
        return this._editButtons
    }

    private toogleLoading(element: HTMLButtonElement) {
        element.classList.toggle('loading')
        element.disabled = !element.disabled
    }

    getCaptureList() {
        return this.gestureImageCaptureList
    }

    clearCaptureList() {
        this.gestureImageCaptureList = []
    }

    clearCaptureListContainer() {
        this.gesturesCapturesPreviewsContainer.innerHTML = ''
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
        this.finishButton.disabled = true
    }

    onDone() {
        this.finishButton.disabled = false
        this.startButton.disabled = true
    }

    appendCapture(img: HTMLImageElement) {
        this.gestureImageCaptureList.push(img)
    }

    private createGestureCaptureImage(): HTMLImageElement {
        const img = document.createElement('img')
        img.className = 'gestures-captures-previews'
        return img
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

        const horizontalRatio = canvas.width  / video.width 
        const verticalRatio =  canvas.height / video.height
        const ratio  = Math.min (horizontalRatio, verticalRatio)
        const centerShiftX = (canvas.width - video.width * ratio) / 2
        const centerShiftY = (canvas.height - video.height * ratio) / 2 

        context.drawImage(video, 0, 0, video.width, video.height,
                      centerShiftX, centerShiftY, video.width * ratio, video.height * ratio);

        const photo = this.createGestureCaptureImage()
        const data = canvas.toDataURL("image/png");
        photo.setAttribute('src', data)

        return photo
    }

    startProgress() {
        this._progressBar.classList.add('on-progress')
    }
    
    stopProgress() {
        this._progressBar.classList.remove('on-progress')
    }

    showCaptures() {
        this.gestureImageCaptureList.forEach(capture => {
            this.gesturesCapturesPreviewsContainer.appendChild(capture)
        })
    }

    updateCaptureCount() {
        const captureCount = this.gestureImageCaptureList.length
        this.captureCount.innerHTML = `(${captureCount} de ${Constants.MAX_PICTURES_TAKEN})`
    }

    loop(fn: FrameRequestCallback) {
        this.loopId = requestAnimationFrame(fn)
    }

    dispose() {
        this.gestureImageCaptureList = []
        this.gesturesCapturesPreviewsContainer.innerHTML = ""
        this.captureCount.innerHTML = ""
        cancelAnimationFrame(this.loopId)
    }
}