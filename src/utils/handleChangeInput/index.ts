import { browser } from 'webextension-polyfill-ts';

export function handleChangeInput(
  element: HTMLInputElement,
  callback?: (value: string | number | boolean) => void,
) {
  element.addEventListener('change', (ev) => {
    if (ev.target instanceof HTMLInputElement) {
      const value =
        element.type === 'checkbox' ? ev.target.checked : ev.target.value;
      browser.storage.sync.set({
        [element.id]: value,
      });
      if (callback) callback(value);
    }
  });
}
