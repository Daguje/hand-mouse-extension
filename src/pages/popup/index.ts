import { dispatchInputChanges } from '@pages/popup/dispatchInputChanges';
import { browser } from 'webextension-polyfill-ts';
import { setInputValueFromStorage } from '../../utils/setInputValueFromStorage';

const elements = ['disable-detection', 'hide-camera'].map(
  (id) => document.getElementById(id) as HTMLInputElement,
);

elements.forEach((element) => {
  dispatchInputChanges(element);
  setInputValueFromStorage(element);
});

const optionsPageLink = document.getElementById('options-page-link') as HTMLAnchorElement
optionsPageLink.addEventListener('click', () => {
  browser.runtime.sendMessage('OPEN_OPTIONS')
})