import { PixelInput } from '@tensorflow-models/hand-pose-detection/dist/shared/calculators/interfaces/common_interfaces';
import { Camera, Cursor, HandDector } from '../../lib';
import { browser } from 'webextension-polyfill-ts';
import { getStorageItem } from '@utils/storage';
import { sendMessageToRuntime } from '@utils/message';

let video: PixelInput;
let handDetector: HandDector;
let cursor: Cursor;
const sendMessageFromContent = sendMessageToRuntime('content');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.style.pointerEvents = 'none';
canvas.width = globalThis.screen.availWidth;
canvas.height = globalThis.screen.availHeight;
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '9999';

document.body.appendChild(canvas);

const results = async () => {
  const hands = await handDetector.estimateHands(video);
  cursor.drawHands(hands);

  requestAnimationFrame(results);
};

const contextScript = async () => {
  video = await Camera.create();
  handDetector = await HandDector.create();
  cursor = new Cursor({ video, canvas, ctx });
  Camera.draw(video);
  getStorageItem('hide-camera').then((items) => {
    const hideCamera = items['hide-camera'];
    if (hideCamera) Camera.hide();
    else Camera.show();
  });

  results();

  browser.runtime.onMessage.addListener(async (message) => {
    switch (message.from) {
      case 'popup':
        if (message.content['hide-camera'] !== undefined) {
          if (message.content['hide-camera'] === true) {
            Camera.hide();
          } else {
            Camera.show();
          }
        }
        break;
    }
  });
};
contextScript();
