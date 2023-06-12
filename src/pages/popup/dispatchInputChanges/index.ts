import { handleChangeInput } from '@utils/handleChangeInput';
import { sendMessageToTab } from '@utils/message';
import { setStorageItem } from '@utils/storage';
import { browser } from 'webextension-polyfill-ts';

const sendMessageFromPopup = sendMessageToTab('popup');

export function dispatchInputChanges(
  element: HTMLInputElement,
  callback?: (value: string | number | boolean) => void,
) {
  handleChangeInput(element, (value) => {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const tabId = tabs[0].id;

      sendMessageFromPopup(tabId, {
        [element.id]: value,
      });
    });
    setStorageItem(element.id, value);
    if (callback) callback(value);
  });
}
