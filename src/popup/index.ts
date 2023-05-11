import '../../styles/tailwind.css';
import { browser } from 'webextension-polyfill-ts';
import { handleChangeInput } from '../utils/handleChangeInput';
import { initializeInputByStorage } from '../utils/InitializeElementByStorage';
import { sendMessage } from '@utils/sendMessage';

document.getElementById('go-to-options').addEventListener('click', () => {
  browser.runtime.openOptionsPage();
});
const sendMessageFromPopup = sendMessage('popup');

const switchHideCamera = document.getElementById(
  'hide-camera',
) as HTMLInputElement;
handleChangeInput(switchHideCamera, (value) => {
  sendMessageFromPopup({ message: value });
});
initializeInputByStorage(switchHideCamera).then((res) => console.log(res));

const switchHideHand = document.getElementById(
  'disable-hand-display',
) as HTMLInputElement;
handleChangeInput(switchHideHand, (value) => console.log(value));
initializeInputByStorage(switchHideHand).then((res) => console.log(res));

const handSize = document.getElementById('hand-size') as HTMLInputElement;
handleChangeInput(handSize, (value) => console.log(value));
initializeInputByStorage(handSize).then((res) => console.log(res));
