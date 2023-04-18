import { Camera } from './lib'

async function sendCamera(sendResponse: (response: any) => void){
    const camera = await Camera.init()
    sendResponse({ camera })
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (!message) return
    
    switch(message.action){
        case 'UPDATED':
            console.log('HandMouse carregado')
            sendCamera(sendResponse)
            return true
        case 'HANDS_PREDICTED':
            console.log({ message })
            return true
        default:
            return true
    }
});