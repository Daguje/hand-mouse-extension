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
    video.style.height = '100%'
    video.style.width = '100%'
    element.replaceChildren(video)
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

  dispose() {
    this.video.pause();

    const stream = this.video.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    this.video.srcObject = null;

    this.video.parentNode.removeChild(this.video);
  }
}