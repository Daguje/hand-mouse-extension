import { getStorageItem } from '@utils/storage';

/**
 * This function initialize the input with the value from the storage.
 * @param {HTMLInputElement} element - The input element to initialize.
 * @returns {Promise<Storage>} The data from the storage.
 */
export function initializeInputByStorage(element: HTMLInputElement) {
  return new Promise((resolve, reject) => {
    if (!element) {
      reject(new Error(`Element not found`));
    }
    getStorageItem(element.id)
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
