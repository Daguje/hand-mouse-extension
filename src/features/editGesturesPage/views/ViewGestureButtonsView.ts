import { GesturesDef } from "@gestures/types";

interface IViewGesturesButtonsViewProps {
    onView: (gesture: GesturesDef) => Promise<unknown>
}

export class ViewGestureButtonsView {
    private viewButtons: Record<GesturesDef, HTMLButtonElement>
    private onView: IViewGesturesButtonsViewProps['onView']

    constructor({ onView }: IViewGesturesButtonsViewProps) {
        this.onView = onView

        this.viewButtons = {} as Record<GesturesDef, HTMLButtonElement>
    }

    setButtonDisabled(gesture: GesturesDef, disabled: boolean) {
        this.viewButtons[gesture].disabled = disabled
    }

    private initPreviewButtons() {
        const viewButtonInfo = [
            { id: 'view-click-gesture-preview', gesture: GesturesDef.Click },
            { id: 'view-scroll-up-gesture-preview', gesture: GesturesDef.ScrollUp},
            { id: 'view-scroll-down-gesture-preview', gesture: GesturesDef.ScrollDown},
            { id: 'view-free-move-gesture-preview', gesture: GesturesDef.FreeMove },
            { id: 'view-backward-gesture-preview', gesture: GesturesDef.Backward },
            { id: 'view-forward-gesture-preview', gesture: GesturesDef.Forward},
            { id: 'view-move-gesture-preview', gesture: GesturesDef.None}
        ];

        viewButtonInfo.forEach(info => {
            const button = document.getElementById(info.id) as HTMLButtonElement

            button.disabled = true
            button.addEventListener('click', async () => await this.onView(info.gesture))
    
            this.viewButtons[info.gesture] = button
        })
    }

    init() {
        this.initPreviewButtons()
    }
}