export class CaptureObserversView {
    private _beginCapturesButton: HTMLButtonElement
    private _saveCapturesButton: HTMLButtonElement
    private _pauseCapturesButton: HTMLButtonElement
    private _closeDialogButton: HTMLButtonElement
    private _resumeCaptureButton: HTMLButtonElement
    private _deleteCapturesButton: HTMLButtonElement

    constructor() {
        this._beginCapturesButton = document.getElementById('start-capture-button') as HTMLButtonElement
        this._saveCapturesButton = document.getElementById('finish-capture-button') as HTMLButtonElement
        this._pauseCapturesButton = document.getElementById('pause-capture-button') as HTMLButtonElement
        this._resumeCaptureButton = document.getElementById('resume-capture-button') as HTMLButtonElement
        this._closeDialogButton = document.getElementById('close-edit-dialog') as HTMLButtonElement
        this._deleteCapturesButton = document.getElementById('delete-captures-button') as HTMLButtonElement
    }

    get beginCapturesButton() {
        return this._beginCapturesButton
    }

    get saveCapturesButton() {
        return this._saveCapturesButton
    }

    get pauseCapturesButton() {
        return this._pauseCapturesButton
    }

    get resumeCaptureButton() {
        return this._resumeCaptureButton
    }

    get closeDialogButton() {
        return this._closeDialogButton
    }

    get deleteCapturesButton() {
        return this._deleteCapturesButton
    }

    setup() {
        this._beginCapturesButton.disabled = false
        this._saveCapturesButton.disabled = true
        this._pauseCapturesButton.disabled = true
        this._closeDialogButton.disabled = false
        this._deleteCapturesButton.disabled = true

        this._saveCapturesButton.classList.remove('loading')
        this._saveCapturesButton.innerHTML = 'Salvar Gesto'
    }

    onPaused() {
        this._pauseCapturesButton.disabled = true
        this._pauseCapturesButton.classList.add('hide')

        this._resumeCaptureButton.disabled = false
        this._resumeCaptureButton.classList.remove('hide')

        this._deleteCapturesButton.disabled = false

        this._beginCapturesButton.disabled = true
        this._saveCapturesButton.disabled = true
    }

    onDelete() {
        this._pauseCapturesButton.disabled = true
        this._pauseCapturesButton.classList.add('hide')

        this._resumeCaptureButton.disabled = true
        this._resumeCaptureButton.classList.remove('hide')

        this._deleteCapturesButton.disabled = true

        this._beginCapturesButton.disabled = true
        this._saveCapturesButton.disabled = true
    }

    onCapturing() {
        this._beginCapturesButton.disabled = true
        this._saveCapturesButton.disabled = true
        this._deleteCapturesButton.disabled = true

        this._pauseCapturesButton.disabled = false
        this._pauseCapturesButton.classList.remove('hide')

        this._resumeCaptureButton.disabled = true
        this._resumeCaptureButton.classList.add('hide')
    }

    onClosing() {
        this._pauseCapturesButton.disabled = true
        this._pauseCapturesButton.classList.remove('hide')

        this._resumeCaptureButton.disabled = true
        this._resumeCaptureButton.classList.add('hide')

        this._saveCapturesButton.disabled = true
        this._saveCapturesButton.classList.remove('loading')

        this._deleteCapturesButton.disabled = true

        this._beginCapturesButton.disabled = true
        this._closeDialogButton.disabled = true
    }

    onDoneCapturing() {
        this._deleteCapturesButton.disabled = false

        this._pauseCapturesButton.disabled = true
        this._pauseCapturesButton.classList.remove('hide')

        this._resumeCaptureButton.disabled = true
        this._resumeCaptureButton.classList.add('hide')

        this._beginCapturesButton.disabled = true
        this._saveCapturesButton.disabled = false
    }

    onSaving() {
        this._pauseCapturesButton.disabled = true
        this._resumeCaptureButton.disabled = true
        this._beginCapturesButton.disabled = true
        this._closeDialogButton.disabled = true
        this._deleteCapturesButton.disabled = true

        this._saveCapturesButton.disabled = true
        this._saveCapturesButton.classList.add('loading')
        this._saveCapturesButton.innerHTML = ''
    }

    dispose() {
        this._beginCapturesButton = null
        this._closeDialogButton = null
        this._pauseCapturesButton = null
        this._resumeCaptureButton = null
        this._saveCapturesButton = null
    }
}