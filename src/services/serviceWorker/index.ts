import { browser } from 'webextension-polyfill-ts';
import { initializeStorageWithDefaults } from '../../utils/storage';
import { Message } from '@utils/message/types';

browser.runtime.onInstalled.addListener(async () => {
  await initializeStorageWithDefaults({});

  console.log('HandMouse instalado com sucesso');
});

browser.runtime.onMessage.addListener((message: Message) => {
  switch (message.from) {
    case 'popup':
      console.log(message);
      break;
    case 'options':
      console.log(message);
      break;
    default:
      throw new Error('Message from not found');
  }
});
