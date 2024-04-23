interface IDialogViewProps {
    dialog: HTMLDialogElement
    title: HTMLHeadingElement
    description: HTMLParagraphElement
}

export class DialogView {
    private dialog: HTMLDialogElement
    private title: HTMLHeadingElement
    private description: HTMLParagraphElement 

    constructor({ dialog, description, title }: IDialogViewProps) {
        this.dialog = dialog
        this.description = description
        this.title = title
    }

    setTitle(title: string) {
        this.title.innerText = title
    }

    setDescription(description: string) {
        this.description.innerText = description
    }   

    show() {
        this.setTitle('Carregando...')
        this.dialog.showModal()
    }

    hide() {
        this.dialog.close()
        this.setTitle('')
        this.setDescription('')
    }
}