import { Camera } from './lib'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message) return
    
    switch(message.action){
        case 'UPDATED':
            (async () => {
                const camera = await Camera.init()
                console.log({camera})
                sendResponse({ camera })
            })();
            return true
        case 'HANDS_PREDICTED':
            console.log({ message })
            return true
    }
    return true
});