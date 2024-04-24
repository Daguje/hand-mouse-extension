import { Capture } from ".";

interface ICapturesListView {
    captures: Array<Capture>
}

export class CapturesListView implements ICapturesListView {
    captures: Array<Capture>;
    selectedCaptures: Array<Capture>;
    private gesturesCapturesPreviewsContainer: HTMLDivElement

    constructor({ captures }: Partial<ICapturesListView>) {
        this.captures = captures
        this.gesturesCapturesPreviewsContainer = document.getElementById('gestures-captures-previews-container') as HTMLDivElement
        this.selectedCaptures = []
    }

    get totalCaptures() {
        return this.captures.length
    }

    get list() {
        return this.captures
    }

    createCapture(video: HTMLVideoElement) {
        const newCaptureId = Math.random()
        return Capture.create({ id: newCaptureId, onSelect: () => this.toggleSelect(newCaptureId) }, video)
    }

    show() {
        this.gesturesCapturesPreviewsContainer.innerHTML = ''
        this.captures.forEach(capture => {
            this.gesturesCapturesPreviewsContainer.appendChild(capture.container)
        })
    }

    append(capture: Capture) {
        this.captures.push(capture)
    }

    clear() {
        this.captures = []
        this.gesturesCapturesPreviewsContainer.innerHTML = ''
    }

    delete() {
        this.captures = this.captures.filter(capture => !this.selectedCaptures.includes(capture))
        this.selectedCaptures = []
    }

    private getCapture(captureArray: Array<Capture>, id: number) {
        const capture = captureArray.find(capture => capture.id === id)
        if(!capture) return null 

        return capture
    }

    private select(capture: Capture) {
        this.selectedCaptures.push(capture)
    }

    private unSelect(capture: Capture) {
        this.selectedCaptures = this.selectedCaptures.filter(selectedCapture => selectedCapture.id !== capture.id)
    }

    private toggleSelect(id: number) {
        const capture = this.getCapture(this.captures, id)

        if (this.selectedCaptures.includes(capture)) {
            this.unSelect(capture)
        } else {
            this.select(capture)
        }

        console.log(this.selectedCaptures)
    }

    dispose() {
        this.captures.forEach(capture => capture.dispose())
    }
}