import { browser } from 'webextension-polyfill-ts';
import { Storage } from './types';

/**
 *  This function gets all the data from the storage.
 * @returns {Promise<Storage>} The data from the storage.
 */
export function getStorageData(): Promise<Storage> {
  return browser.storage.sync.get();
}

/**
 *  This function gets a specific item from the storage.
 * @param {keyof Storage} key - The key of the item to get from the storage.
 * @returns {Promise<Storage[keyof Storage]>} The item from the storage.
 */
export function getStorageItem(
  key: keyof Storage,
): Promise<Storage[keyof Storage]> {
  if (typeof key !== 'string') key = key.toString();
  return browser.storage.sync.get(key);
}

/**
 *  This function sets all the data from the storage.
 * @param {Storage} data - The data to set in the storage.
 * @returns {Promise<void>} A promise that resolves when the data is set.
 */
export function setStorageData(data: Storage): Promise<void> {
  return browser.storage.sync.set(data);
}

/**
 *  This function sets a specific item from the storage.
 * @param {keyof Storage} key - The key of the item to set in the storage.
 * @param {Storage[keyof Storage]} value - The value of the item to set in the storage.
 * @returns {Promise<void>} A promise that resolves when the item is set.
 */
export function setStorageItem(
  key: keyof Storage,
  value: Storage[keyof Storage],
): Promise<void> {
  if (typeof key !== 'string') key = key.toString();
  return browser.storage.sync.set({ [key]: value });
}

/**
 *  This function initialize the storage with default values passed.
 * @param {Storage} defaults - The data to set whit default in the storage.
 */
export async function initializeStorageWithDefaults(defaults: Storage) {
  const currentStorageData = await getStorageData();
  const newStorageData = Object.assign({}, defaults, currentStorageData);
  await setStorageData(newStorageData);
}
