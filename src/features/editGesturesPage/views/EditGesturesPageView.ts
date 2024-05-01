import { GesturesDef } from "@gestures/types";
import { EditGestureButtonsView, TrainButtonView, ViewGestureButtonsView } from ".";

interface IEditGesturesPageViewProps {
    editGestureButtonsView: EditGestureButtonsView
    viewGestureButtonsView: ViewGestureButtonsView
    trainButtonView: TrainButtonView
    onClosePage: () => void
}

export class EditGesturesPageView {
    private editGestureButtonsView: IEditGesturesPageViewProps['editGestureButtonsView']
    private trainButtonView: IEditGesturesPageViewProps['trainButtonView']
    private viewGestureButtonsView: IEditGesturesPageViewProps['viewGestureButtonsView']

    private closePageButton: HTMLButtonElement
    private onClosePage: IEditGesturesPageViewProps['onClosePage']

    private constructor({ editGestureButtonsView, trainButtonView, viewGestureButtonsView, onClosePage }: IEditGesturesPageViewProps) {
        this.editGestureButtonsView = editGestureButtonsView
        this.trainButtonView = trainButtonView
        this.viewGestureButtonsView = viewGestureButtonsView
        this.onClosePage = onClosePage
        this.closePageButton = document.getElementById('close-page-button') as HTMLButtonElement
    }

    get trainButton() {
        return this.trainButtonView.trainButton
    }

    setButtonDisabled(gesture: GesturesDef, disabled: boolean) {    
        if (gesture == GesturesDef.None) return
        this.viewGestureButtonsView.setButtonDisabled(gesture, disabled)
    }

    private init() {
        this.editGestureButtonsView.init()
        this.viewGestureButtonsView.init()
        this.closePageButton.addEventListener('mousedown', this.onClosePage)
    }

    static create(deps: IEditGesturesPageViewProps) {
        const view = new EditGesturesPageView(deps)
        view.init()

        return view
    }
}