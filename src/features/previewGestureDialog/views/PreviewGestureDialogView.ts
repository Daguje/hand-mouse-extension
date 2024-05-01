import { GesturesDef, gesturePortugueseTranslateMap } from "@gestures/types";
import { DialogView } from "../../DialogView";

interface IPreviewGestureDialogView {
    dialogView: DialogView
}

export class PreviewGestureDialogView {
    private _closeDialogButton: HTMLButtonElement
    private _previewContainer: HTMLDivElement
    private dialogView: DialogView

    constructor({ dialogView }: IPreviewGestureDialogView) {
        this.dialogView = dialogView
        this._closeDialogButton = document.getElementById('close-preview-dialog') as HTMLButtonElement

        this._previewContainer = document.getElementById('preview-container') as HTMLDivElement
    }
    
    private onClose() {
        this.dialogView.hide()
        this.dispose()
    }

    private setPreview(preview: string) {
        const previewImage = document.createElement('img')
        previewImage.setAttribute('src', "data:image/png;base64," + preview)
        this._previewContainer.appendChild(previewImage)
    }

    private setDialogTitle(gesture: GesturesDef) {
        const translatedGestureName = gesturePortugueseTranslateMap[gesture]
        this.dialogView.show()
        this.dialogView.setTitle(`Visualizar gesto de ${translatedGestureName}`)
    }
    
    setup(gesture: GesturesDef, preview: string) {
        this._closeDialogButton.addEventListener('mousedown', this.onClose)
        this.setPreview(preview)
        this.setDialogTitle(gesture)
    }
    
    private dispose() {
        this.dialogView = null
        this._closeDialogButton.removeEventListener('mousedown', this.onClose)
        this._closeDialogButton = null
    }
}