import { browser } from 'webextension-polyfill-ts';
import { Message } from './types';

/**
 * @description This function is a decorator to send messages to the background script.
 * @property {string}  from                - The name of the sender.
 * @returns {function} sendMessage        - The function to send a message to the background script.
 */
export function sendMessage(from: string): (message: Message) => Promise<void> {
  /**
   * @property {Message} message                - The message to send to the background script.
   */
  return (message: Message) => browser.runtime.sendMessage({ from, message });
}
