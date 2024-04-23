import { Capture, CapturesListView } from ".";

interface ICapturesListContainerView {
    list: CapturesListView
}

export class CapturesListContainerView implements ICapturesListContainerView {
    list: CapturesListView

    constructor({ list }: ICapturesListContainerView) {
        this.list = list
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
}