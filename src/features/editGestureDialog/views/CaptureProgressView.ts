export class CaptureProgressView {
    private progressBar: HTMLDivElement

    constructor() {
        this.progressBar = document.getElementById('progress-bar') as HTMLDivElement
    }

    startProgress() {
        this.progressBar.classList.add('on-progress')
    }
    
    stopProgress() {
        this.progressBar.classList.remove('on-progress')
    }

    dispose() {
        this.progressBar = null
    }
}