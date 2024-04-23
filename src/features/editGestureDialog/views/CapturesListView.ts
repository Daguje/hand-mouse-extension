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
        const newCaptureId = this.captures.length
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
        console.log(this.captures)
    }

    private getCaptureIndex(captureArray: Array<Capture>, id: number) {
        const index = captureArray.findIndex(capture => capture.id === id)
        if(index < 0) return null 

        return index
    }

    private toggleSelect(id: number) {
        const index = this.getCaptureIndex(this.captures, id)

        if (this.selectedCaptures.includes(this.captures[index])) {
            this.selectedCaptures.splice(index, 1)
        } else {
            this.selectedCaptures.push(this.captures[index])
        }

        console.log(this.selectedCaptures)
    }

    dispose() {
        this.captures.forEach(capture => capture.dispose())
    }
}