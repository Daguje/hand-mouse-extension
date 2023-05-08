const s = document.createElement('script');
s.src = chrome.runtime.getURL('app.js');
s.onload = function(this: HTMLScriptElement) {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);