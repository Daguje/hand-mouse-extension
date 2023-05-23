import { handleChangeInput } from '@utils/handleChangeInput';
import { sendMessageToRuntime } from '@utils/message';
import { setStorageItem } from '@utils/storage';

const sendMessageFromPopup = sendMessageToRuntime('popup');

export function dispatchInputChanges(
  element: HTMLInputElement,
  callback?: (value: string | number | boolean) => void,
) {
  handleChangeInput(element, (value) => {
    sendMessageFromPopup({
      'element-has-been-updated': {
        [element.id]: value,
      },
    });
    setStorageItem(element.id, value);
    if (callback) callback(value);
  });
}
