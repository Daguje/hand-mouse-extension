import { browser } from 'webextension-polyfill-ts';
import { initializeStorageWithDefaults } from '../../utils/storage';

browser.runtime.onInstalled.addListener(async () => {
  await initializeStorageWithDefaults({});

  console.log('HandMouse instalado com sucesso');
});

browser.runtime.onMessage.addListener((m) => console.log(m));

console.log('HandMouse rodando');
browser.management.getSelf().then((extensionInfo) => {
  console.log(extensionInfo.installType);
});
