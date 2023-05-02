export class Camera {
    video: HTMLVideoElement

    constructor() {
        this.video = document.createElement("video")
    }
    
    private static getVideoConfig(): MediaStreamConstraints {
        return {
            audio: false,
            video: {
                width: globalThis.screen.availWidth,
                height: globalThis.screen.availHeight,
                frameRate: {
                    ideal: 30,
                }
            }
        }
    }

    static draw(video: HTMLVideoElement) {
        video.height = 240
        video.width = 320
        video.style.transform = 'scaleX(-1)'
        video.style.position = 'fixed'
        video.style.top = '16px'
        video.style.left = '16px'  
        video.style.zIndex = '9999'  

        document.body.append(video)

        video.play()
    }

    static async create() {
        if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
            throw new Error('API do Browser navigator.mediaDevices.getUserMedia não está disponível')
        }

        const stream = await navigator.mediaDevices.getUserMedia(this.getVideoConfig())

        const camera = new Camera()
        camera.video.srcObject = stream
        
        // Permissão da Câmera
        await new Promise(resolve => {
            camera.video.onloadedmetadata = () => {
                resolve(camera.video)
            }
        })

        return camera.video
    }
}