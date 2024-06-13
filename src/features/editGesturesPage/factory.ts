import KNNClassifier from "@classifiers/knn"
import editGestureDialogFactory from '@features/editGestureDialog/factory'
import previewGestureDialogFactory from '@features/previewGestureDialog/factory'
import GestureEstimatorService from "@services/GestureEstimatorService"
import { GesturesDataService } from "@services/GesturesDataService"
import { EditGesturesPageController } from "./controllers"
import { EditGestureButtonsView, EditGesturesPageView, TrainButtonView, ViewGestureButtonsView } from "./views"

const factory = {
    async initialize() {
        const knnClassifier = KNNClassifier.create()

        return EditGesturesPageController.initialize({
            view: EditGesturesPageView.create({
                editGestureButtonsView: new EditGestureButtonsView({ onEdit: editGestureDialogFactory.initialize }),
                trainButtonView: new TrainButtonView(),
                viewGestureButtonsView: new ViewGestureButtonsView({ onView: previewGestureDialogFactory.initialize }),
                onClosePage: () => window.close()
            }),
            gestureEstimatorService: new GestureEstimatorService({
                gestureClassifier: knnClassifier
            }),
            gesturesDataService: new GesturesDataService()
        })
    }
}

export default factory