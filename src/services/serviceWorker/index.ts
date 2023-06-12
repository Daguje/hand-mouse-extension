import { browser } from 'webextension-polyfill-ts';
import {
  getStorageItem,
  initializeStorageWithDefaults,
} from '../../utils/storage';

browser.runtime.onInstalled.addListener(async () => {
  await initializeStorageWithDefaults({});

  console.log('HandMouse instalado com sucesso');
});

chrome.runtime.onMessage.addListener(async (message, _, sendResponse) => {
  switch (message.from) {
    case 'popup':
      console.log(message);
      break;
    case 'content':
      if (message.content.requestStorage) {
        const storage = await getStorageItem(message.content.requestStorage);
        sendResponse(storage);
      }
      break;
    default:
      throw new Error('Message from not found');
  }
});
