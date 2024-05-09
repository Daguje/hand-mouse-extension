import { dispatchInputChanges } from '@pages/popup/dispatchInputChanges';
import { setInputValueFromStorage } from '../../utils/setInputValueFromStorage';

const elements = ['disable-detection', 'hide-camera'].map(
  (id) => document.getElementById(id) as HTMLInputElement,
);

elements.forEach((element) => {
  dispatchInputChanges(element);
  setInputValueFromStorage(element);
});
