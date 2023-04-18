import { Controller } from './lib'

const controller = new Controller()

chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
    const url = changeInfo.url
    const message = { action: 'UPDATED', url };

    chrome.tabs.sendMessage(tabId, message, (response) => {
        if (!response.camera) {
            console.error('Não foi possível obter informações da camera');
            return;
          }

        controller.estimateHands(response.camera, url, tabId)
    });
})