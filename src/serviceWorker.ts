import { initializeStorageWithDefaults } from './storage';

chrome.runtime.onInstalled.addListener(async () => {
  await initializeStorageWithDefaults({});

  console.log('HandMouse instalado com sucesso');
});