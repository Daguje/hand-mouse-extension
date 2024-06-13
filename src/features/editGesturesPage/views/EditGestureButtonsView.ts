import { GesturesDef } from "@gestures/types";

interface IEditGesturesButtonsViewProps {
    onEdit: (gesture: GesturesDef) => Promise<unknown>
}

export class EditGestureButtonsView {
    private editButtons: Record<GesturesDef, HTMLButtonElement>
    private onEdit: IEditGesturesButtonsViewProps['onEdit']

    constructor({ onEdit }: IEditGesturesButtonsViewProps) {
        this.onEdit = onEdit
        this.editButtons = {} as Record<GesturesDef, HTMLButtonElement>
    }

    private initEditButtons() {
        const editButtonInfo = [
            { id: 'edit-click-gesture-button', gesture: GesturesDef.Click },
            { id: 'edit-scroll-up-gesture-button', gesture: GesturesDef.ScrollUp},
            { id: 'edit-scroll-down-gesture-button', gesture: GesturesDef.ScrollDown},
            { id: 'edit-free-move-gesture-button', gesture: GesturesDef.FreeMove },
            { id: 'edit-backward-gesture-button', gesture: GesturesDef.Backward },
            { id: 'edit-forward-gesture-button', gesture: GesturesDef.Forward},
            { id: 'edit-move-gesture-button', gesture: GesturesDef.None}
        ];

        editButtonInfo.forEach(info => {
            const button = document.getElementById(info.id) as HTMLButtonElement
            button.addEventListener('click', async () => await this.onEdit(info.gesture))
            this.editButtons[info.gesture] = button
        })
    }

    init() {
        this.initEditButtons()
    }
}