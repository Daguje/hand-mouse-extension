interface ICapture {
    id: number
    onSelect: (id: number) => void
}

export class Capture {
    id: number
    onSelect: ICapture['onSelect']
    img: HTMLImageElement
    checkbox: HTMLInputElement
    container: HTMLButtonElement

    private constructor({ id, onSelect }: ICapture) {
        this.id = id
        this.onSelect = onSelect
    }

    private init(video: HTMLVideoElement) {
        const src = this.creapteCaptureSrc(video)
        this.img = this.createCaptureImageElement(src)
        this.checkbox = this.createCheckboxElement()

        this.container = this.createContainer()
        this.container.appendChild(this.checkbox)
        this.container.appendChild(this.img)
    }

    static create(deps: ICapture, video: HTMLVideoElement): Capture {
        const capture = new Capture(deps)
        capture.init(video)

        return capture
    }

    private creapteCaptureSrc(video: HTMLVideoElement) {
        const canvas = document.createElement('canvas')
        canvas.width = 165
        canvas.height = 165

        const context = canvas.getContext('2d')
        
        const horizontalRatio = canvas.width  / video.width 
        const verticalRatio =  canvas.height / video.height
        const ratio  = Math.min (horizontalRatio, verticalRatio)
        const centerShiftX = (canvas.width - video.width * ratio) / 2
        const centerShiftY = (canvas.height - video.height * ratio) / 2 
        
        context.drawImage(video, 0, 0, video.width, video.height,
            centerShiftX, centerShiftY, video.width * ratio, video.height * ratio);
            
        const src = canvas.toDataURL("image/png");
        return src
    }

    private createCaptureImageElement(src: string): HTMLImageElement {
        const img = document.createElement('img')
        img.setAttribute('className', 'gestures-captures-previews')
        img.setAttribute('src', src)
        img.width = 165
        img.height = 165
        
        return img
    }

    private createCheckboxElement(): HTMLInputElement {
        const input = document.createElement('input')
        input.setAttribute('type', 'checkbox')
        input.setAttribute('value', this.id.toString())
        input.setAttribute('id', this.id.toString())
        input.classList.add('capture-preview-checkbox')

        return input
    }

    private createContainer(): HTMLButtonElement {
        const container = document.createElement('button')
        container.classList.add('gestures-captures-previews')

        container.addEventListener('mousedown', () => {
            this.onSelect(this.id)
            this.checkbox.checked = !this.checkbox.checked
        })

        return container
    }


    dispose() {
        this.checkbox = null
        this.img = null
    }
}   