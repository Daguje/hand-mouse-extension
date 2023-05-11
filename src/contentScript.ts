import { browser } from 'webextension-polyfill-ts';

const s = document.createElement('script');
s.src = chrome.runtime.getURL('app.js');
s.onload = function (this: HTMLScriptElement) {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

browser.runtime.onMessage.addListener((m) => console.log(m));
