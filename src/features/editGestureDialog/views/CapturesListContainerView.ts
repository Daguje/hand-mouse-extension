import { Constants } from "@lib/constants";
import { Capture, CapturesListView } from ".";

interface ICapturesListContainerView {
    list: CapturesListView
}

export class CapturesListContainerView implements ICapturesListContainerView {
    list: CapturesListView
    captureCounterSpan: HTMLSpanElement

    constructor({ list }: ICapturesListContainerView) {
        this.list = list
        this.captureCounterSpan = document.getElementById('capture-count') as HTMLSpanElement
    }

    clear() {
        this.list.clear()
    }

    append(capture: Capture) {
        this.list.append(capture)
    }

    capture(video: HTMLVideoElement) {
        return this.list.createCapture(video)
    }

    show() {
        this.list.show()
    }

    delete() {
        this.list.delete()
    }

    dispose() {
        this.clear()
        this.list.dispose()
        this.list = null
    }

    updateCapturesCounter() {
        let text = ''

        if (this.list.totalCaptures > 0) {
            text = `(${this.list.totalCaptures}/${Constants.MAX_PICTURES_TAKEN})`
            this.captureCounterSpan.innerHTML = text
            return
        }

        this.captureCounterSpan.innerHTML = text
    }
}