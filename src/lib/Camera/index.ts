const MAX_Z_INDEX = '2147483647'
const CAMERA_DISPLAY_WIDTH = '240px'
const CAMERA_DISPLAY_HEIGHT = '320px'

export class Camera {
  video: HTMLVideoElement

  constructor() {
    this.video = document.createElement('video');
  }

  private static getVideoConfig() {
    return {
      audio: false,
      video: {
        width: globalThis.screen.availWidth,
        height: globalThis.screen.availHeight,
        frameRate: {
          ideal: 60,
        },
      },
    };
  }

  static draw(video: HTMLVideoElement, element: HTMLElement) {
    video.style.height = CAMERA_DISPLAY_HEIGHT
    video.style.width = CAMERA_DISPLAY_WIDTH
    // video.style.transform = 'scaleX(-1)'
    // video.style.position = 'absolute'
    // video.style.top = '0'
    // video.style.left = '0'
    // video.style.zIndex = MAX_Z_INDEX  
    element.append(video)
  }

  static async create() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        'API do Browser navigator.mediaDevices.getUserMedia não está disponível',
      );
    }

    const stream = await navigator.mediaDevices.getUserMedia(
      this.getVideoConfig(),
      );
      
    const camera = new Camera();
    camera.video.srcObject = stream;
    camera.video.height = camera.video.videoHeight;
    camera.video.width = camera.video.videoWidth;
    camera.video.id = 'hm-camera-display';
    
    // Permissão da Câmera
    await new Promise((resolve) => {
      camera.video.onloadedmetadata = () => {
        resolve(camera.video);
      };
    });

    camera.video.play()

    return camera;
  }
}