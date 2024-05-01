import { GesturesDef, gesturePortugueseTranslateMap } from "@gestures/types";
import { Constants } from "@lib/constants";
import { CaptureObserversView, CaptureProgressView, CapturesListContainerView } from ".";
import { DialogView } from "../../DialogView";

interface IEditGestureDialogView {
    capturesListContainerView: CapturesListContainerView
    captureProgressView: CaptureProgressView
    captureObserversView: CaptureObserversView
    dialogView: DialogView
}

export class EditGestureDialogView {
    private capturesListContainerView: CapturesListContainerView
    private captureProgressView: CaptureProgressView
    private captureObserversView: CaptureObserversView
    private dialogView: DialogView

    constructor({ capturesListContainerView, captureProgressView, captureObserversView, dialogView }: IEditGestureDialogView) {
        this.capturesListContainerView = capturesListContainerView
        this.captureProgressView = captureProgressView
        this.captureObserversView = captureObserversView
        this.dialogView = dialogView
    }

    get beginCapturesButton() {
        return this.captureObserversView.beginCapturesButton
    }

    get saveCapturesButton() {
        return this.captureObserversView.saveCapturesButton
    }

    get pauseCapturesButton() {
        return this.captureObserversView.pauseCapturesButton
    }

    get resumeCaptureButton() {
        return this.captureObserversView.resumeCaptureButton
    }

    get closeDialogButton() {
        return this.captureObserversView.closeDialogButton
    }

    get deleteCapturesButton () {
        return this.captureObserversView.deleteCapturesButton
    }

    get totalCaptures() {
        return this.capturesListContainerView.list.totalCaptures
    }

    get captures() {
        return this.capturesListContainerView.list.captures
    }

    onSetup(gesture: GesturesDef) {
        this.dialogView.show()
        this.captureObserversView.setup()
        this.capturesListContainerView.clear()
        this.dialogView.setTitle(`Editar gesto de ${gesturePortugueseTranslateMap[gesture]}`)
        this.dialogView.setDescription(`Uma sequência de ${Constants.MAX_PICTURES_TAKEN} fotos serão capturadas para registrar o novo gesto correspondente a ação. Use apenas uma das mãos, movimente e varie o ângulo do gesto`)
    }

    onDelete() {
        this.captureObserversView.onDelete()
        this.capturesListContainerView.delete()
        this.capturesListContainerView.show()
    }

    onPaused() {
        this.captureObserversView.onPaused()
        this.captureProgressView.stopProgress()
    }

    onClosing() {
        this.dialogView.hide()
        this.captureObserversView.onClosing()
        this.captureProgressView.stopProgress()
        this.dispose()
    }

    onBeginCaptures(video: HTMLVideoElement) {
        this.captureObserversView.onCapturing()
        this.captureProgressView.startProgress()
        
        const capture = this.capturesListContainerView.capture(video)
        this.capturesListContainerView.append(capture)
        this.capturesListContainerView.show()
        this.capturesListContainerView.updateCapturesCounter()
    }

    onDoneCapturing() {
        this.captureObserversView.onDoneCapturing()
        this.captureProgressView.stopProgress()
    }

    onSaving() {
        this.captureObserversView.onSaving()
    }

    loop(fn: FrameRequestCallback) {
        requestAnimationFrame(fn)
    }

    dispose() {
        this.captureProgressView.dispose()
        this.captureObserversView.dispose()
        this.capturesListContainerView.dispose()
    }
}