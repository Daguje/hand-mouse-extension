export class TrainButtonView {
    private _trainButton: HTMLButtonElement

    constructor() {
        this._trainButton = document.getElementById('train-model-button') as HTMLButtonElement
    }

    get trainButton() {
        return this._trainButton
    }
}