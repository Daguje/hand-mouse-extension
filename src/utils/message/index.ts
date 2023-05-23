import { browser } from 'webextension-polyfill-ts';
import { MessageFrom, MessageContent } from './types';

/**
 * This function is a decorator to send messages to the background script.
 * @property {MessageFrom}  from                - The name of the sender.
 * @returns {function} sendMessage        - The function to send a message to the background script.
 */
export function sendMessageToRuntime<MessageType>(
  from: MessageFrom,
): (content: MessageContent<MessageType>) => Promise<void> {
  /**
   * @property {MessageContent} content                - The content to send to the background script.
   */
  return (content: MessageContent<MessageType>) =>
    browser.runtime.sendMessage({ from, content });
}

/**
 *  This function is a decorator to send messages to the content script.
 * @property {number}  tabId                - The id of the tab.
 * @returns {function} sendMessage        - The function to send a message to tab.
 */
export function sendMessageToTab<MessageType>(
  tabId: number,
): (content: MessageContent) => Promise<void> {
  /**
   * @property {MessageContent} content                - The content to send to the tab.
   */
  return (content: MessageContent<MessageType>) =>
    browser.tabs.sendMessage(tabId, { content });
}
