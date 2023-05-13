import '@styles/tailwind.css';

import { browser } from 'webextension-polyfill-ts';
import { initializeInputByStorage } from '../../utils/InitializeElementByStorage';
import { dispatchInputChanges } from '@pages/options/dispatchInputChanges';

document.getElementById('go-to-options').addEventListener('click', () => {
  browser.runtime.openOptionsPage();
});

const elements = ['hide-camera', 'disable-hand-display', 'hand-size'].map(
  (id) => document.getElementById(id) as HTMLInputElement,
);

elements.forEach((element) => {
  dispatchInputChanges(element);
  initializeInputByStorage(element);
});
