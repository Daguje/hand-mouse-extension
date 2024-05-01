import SVMClassifier from "@classifiers/svm"
import editGestureDialogFactory from '@features/editGestureDialog/factory'
import previewGestureDialogFactory from '@features/previewGestureDialog/factory'
import GestureEstimatorService from "@services/GestureEstimatorService"
import { GesturesDataService } from "@services/GesturesDataService"
import { EditGesturesPageController } from "./controllers"
import { EditGestureButtonsView, EditGesturesPageView, TrainButtonView, ViewGestureButtonsView } from "./views"

const factory = {
    async initialize() {
        const svmClassifier = SVMClassifier.create()

        return EditGesturesPageController.initialize({
            view: EditGesturesPageView.create({
                editGestureButtonsView: new EditGestureButtonsView({ onEdit: editGestureDialogFactory.initialize }),
                trainButtonView: new TrainButtonView(),
                viewGestureButtonsView: new ViewGestureButtonsView({ onView: previewGestureDialogFactory.initialize }),
                onClosePage: () => window.close()
            }),
            gestureEstimatorService: new GestureEstimatorService({
                gestureClassifier: svmClassifier
            }),
            gesturesDataService: new GesturesDataService()
        })
    }
}

export default factory