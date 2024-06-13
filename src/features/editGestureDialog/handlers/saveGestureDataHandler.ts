import { GesturesDef, gestureNameMap, gesturePortugueseTranslateMap } from "@gestures/types";
import { NotificationService } from "@services/NotificationService";
import { setStorageItem } from "@utils/storage";

interface ISaveGestureDataHandlerProps {
    gesture: GesturesDef
}

export default class SaveGestureDataHandler {
    private gesture: GesturesDef
    
    constructor({ gesture }: ISaveGestureDataHandlerProps) {
        this.gesture = gesture
    }

  async saveOnLocalStorage(data: Array<Array<number>>, labels: Array<number>, preview: HTMLImageElement) {
    try {
      if (data.length) {
        await setStorageItem(gestureNameMap[this.gesture], data);
        await setStorageItem(`${gestureNameMap[this.gesture]}Labels`, labels);
        await setStorageItem(
          `${gestureNameMap[this.gesture]}Preview`,
          preview.src.replace(/^data:image\/(png|jpg);base64,/, ''),
        );
      }
    } catch (e) {
      NotificationService.error(
        `Não foi possível processar as imagens de ${
          gesturePortugueseTranslateMap[this.gesture]
        }`,
      );
      throw new Error(
        `Não foi possível salvar os dados em Local Storage: ${e}`,
      );
    }
  }
}
