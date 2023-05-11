import { browser } from 'webextension-polyfill-ts';

export function initializeInputByStorage(element: HTMLInputElement) {
  return new Promise((resolve, reject) => {
    if (!element) {
      reject(new Error(`Element not found`));
    }
    browser.storage.sync
      .get(element.id)
      .then((res) => {
        if (element.type === 'checkbox') {
          element.checked = res[element.id];
        } else {
          element.value = res[element.id];
        }
        resolve(res);
      })
      .catch((err) => reject(err));
  });
}
