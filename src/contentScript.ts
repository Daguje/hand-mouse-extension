const s = document.createElement('script');
s.src = chrome.runtime.getURL('scripts.js');
s.onload = function(this: HTMLScriptElement) {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);
