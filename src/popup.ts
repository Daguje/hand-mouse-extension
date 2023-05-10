import '../styles/tailwind.css';
import { browser } from 'webextension-polyfill-ts';
import { Camera } from './lib';

document.getElementById('go-to-options').addEventListener('click', () => {
  browser.runtime.openOptionsPage();
});

const handDisplayCheckbox = document.getElementById(
  'disable-hand-display',
) as HTMLInputElement;

handDisplayCheckbox.addEventListener('change', (ev) => {
  if (ev.target instanceof HTMLInputElement) {
    browser.storage.local.set({
      disableHandDisplay: ev.target.checked,
    });
  }
});

browser.storage.local.get('disableHandDisplay').then((res) => {
  handDisplayCheckbox.checked = res.disableHandDisplay;
  console.log(res);
});

const hideCameraCheckbox = document.getElementById(
  'hide-camera',
) as HTMLInputElement;

hideCameraCheckbox.addEventListener('change', async ({ target }) => {
  if (target instanceof HTMLInputElement) {
    if (target.checked) {
      // browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      //   browser.tabs.sendMessage(tabs[0].id, {
      //     action: 'hide-camera',
      //   });
      // });
      document.getElementById('hm-camera-display').remove();
    } else {
      const video = await Camera.create();
      Camera.draw(video);
    }
    browser.storage.local.set({
      hideCameraCheckbox: target.checked,
    });
  }
});
browser.storage.local.get('hideCameraCheckbox').then((res) => {
  hideCameraCheckbox.checked = res.hideCameraCheckbox;
  console.log(res);
});
