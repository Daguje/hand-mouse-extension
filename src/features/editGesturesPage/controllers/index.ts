import GestureEstimatorService from "@services/GestureEstimatorService";
import { GesturesDataService } from "@services/GesturesDataService";
import { setStorageData } from "@utils/storage";
import { EditGesturesPageView } from "../views";

interface IEditGesturesPageControllerProps {
    view: EditGesturesPageView;
    gestureEstimatorService: GestureEstimatorService
    gesturesDataService: GesturesDataService
}

export class EditGesturesPageController {
    private gestureEstimatorService: GestureEstimatorService
    private gesturesDataService: GesturesDataService
    private view: EditGesturesPageView

    private constructor ({ gestureEstimatorService, gesturesDataService, view }: IEditGesturesPageControllerProps) {
        this.gestureEstimatorService = gestureEstimatorService
        this.gesturesDataService = gesturesDataService
        this.view = view
    }

    private async onTrain() {
        this.view.trainButton.addEventListener('mousedown', async () => {
            const { data, labels } = await this.gesturesDataService.getAll()

            const allData: Array<Array<number>> = []
            const allLabels: Array<number> = []

            for (const [, value] of Object.entries(data)) {
                if(!value) continue
                allData.push(...value)
            }

            for (const [, value] of Object.entries(labels)) {
                if(!value) continue
                allLabels.push(...value)
            }

            await this.gestureEstimatorService.train(allData, allLabels)
            const customModel = this.gestureEstimatorService.save()
            await setStorageData({ handMouseModel: customModel })
        })
    }

    private async enablePreviewButtons() {
        const previews = await this.gesturesDataService.getAllPreviews()
        for (const [key, value] of Object.entries(previews)) {
            this.view.setButtonDisabled(Number(key), !value)
        }
    }

    private async loop() {
        await this.enablePreviewButtons()
        await this.onTrain()
    }

    private async init() {
        await this.loop();
    }

    static async initialize(deps: IEditGesturesPageControllerProps) {
        const controller = new EditGesturesPageController(deps);
        controller.init();

        return controller;
    }
}