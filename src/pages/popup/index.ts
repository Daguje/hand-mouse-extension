import '@styles/tailwind.css';

import { setInputValueFromStorage } from '../../utils/setInputValueFromStorage';
import { dispatchInputChanges } from '@pages/popup/dispatchInputChanges';

const elements = ['hide-camera', 'disable-detector'].map(
  (id) => document.getElementById(id) as HTMLInputElement,
);

elements.forEach((element) => {
  dispatchInputChanges(element);
  setInputValueFromStorage(element);
});
