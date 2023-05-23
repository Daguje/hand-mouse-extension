import '@styles/tailwind.css';

import { browser } from 'webextension-polyfill-ts';
import { setInputValueFromStorage } from '../../utils/setInputValueFromStorage';
import { dispatchInputChanges } from '@pages/options/dispatchInputChanges';

document.getElementById('go-to-options').addEventListener('click', () => {
  browser.runtime.openOptionsPage();
});

const elements = ['hide-camera', 'disable-hand-display', 'hand-size'].map(
  (id) => document.getElementById(id) as HTMLInputElement,
);

elements.forEach((element) => {
  dispatchInputChanges(element);
  setInputValueFromStorage(element);
});
