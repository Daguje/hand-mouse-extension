import { GesturesDef } from "@gestures/types";
import { GesturesDataService } from "@services/GesturesDataService";
import { DialogView } from "../DialogView";
import PreviewGestureDialogController from "./controllers";
import { PreviewGestureDialogView } from "./views";

const factory = {
  async initialize(gesture: GesturesDef) {
    const dialogView = new DialogView({
      dialog: document.getElementById('preview-dialog') as HTMLDialogElement,
      title: document.getElementById('preview-gesture-dialog-title') as HTMLHeadingElement,
    })

    return PreviewGestureDialogController.initialize({
      gesture,
      view: new PreviewGestureDialogView({ 
        dialogView,
      }),
      gestureDataService: new GesturesDataService()
    });
  },
};

export default factory;
