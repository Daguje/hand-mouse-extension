class Camera {
    video: HTMLVideoElement
  
    constructor() {
        this.video = document.createElement("video") as HTMLVideoElement
    }
    
    private static getVideoConfig() {
        return {
            audio: false,
            video: {
                width: globalThis.screen.availWidth,
                height: globalThis.screen.availHeight,
                frameRate: {
                    ideal: 60
                }
            }
        }
    }
  
    static drawCamera(camera: Camera) {
        camera.video.height = 240
        camera.video.width = 320
        camera.video.style.transform = 'scaleX(-1)'
        camera.video.style.position = 'fixed'
        camera.video.style.top = '16px'
        camera.video.style.left = '16px'  
        camera.video.style.zIndex = '9999'  
  
        document.body.append(camera.video)
    }
  
    static async init() {
        if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
            throw new Error('API do Browser navigator.mediaDevices.getUserMedia não está disponível')
        }
  
        const stream = await navigator.mediaDevices.getUserMedia(this.getVideoConfig())
  
        const camera = new Camera()
        camera.video.srcObject = stream
        this.drawCamera(camera)
        
        // Permissão da Câmera
        await new Promise(resolve => {
            camera.video.onloadedmetadata = () => {
                resolve(camera.video)
            }
        })
  
        camera.video.play()
  
        return camera
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message) return
    
    switch(message.action){
        case 'UPDATED':
            (async () => {
                const camera = await Camera.init()

                const canvas = new OffscreenCanvas(camera.video.width, camera.video.height);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(camera.video, 0, 0);
                const video = ctx.getImageData(0, 0, camera.video.width, camera.video.height);

                sendResponse({ video: video.data })
            })();
            return true
        case 'HANDS_PREDICTED':
            console.log({ message })
            return true
    }
    return true
});