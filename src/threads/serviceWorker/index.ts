import { initializeStorageWithDefaults } from '@utils/storage';
import { browser } from 'webextension-polyfill-ts';
import { MessageActions } from './types';

import initialGestures from './initialGestures.json';
import initialLabels from './initialLabels.json';
import initialModel from './initialModel.json';

const openOptionsPage = async () => {
  await browser.runtime.openOptionsPage();
};

browser.runtime.onInstalled.addListener(async () => {
  await initializeStorageWithDefaults({
    ...initialModel,
    ...initialGestures,
    ...initialLabels,
  });
  await openOptionsPage();
});

browser.runtime.onMessage.addListener((message: MessageActions) => {
  switch (message) {
    case 'OPEN_OPTIONS':
      openOptionsPage();
      break;
  }
});
