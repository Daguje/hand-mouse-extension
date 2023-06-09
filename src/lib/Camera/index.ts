const MAX_Z_INDEX = '2147483647'
const CAMERA_DISPLAY_WIDTH = '240px'
const CAMERA_DISPLAY_HEIGHT = '320px'

export class Camera {
  video: HTMLVideoElement;

  constructor() {
    this.video = document.createElement('video');
  }

  private static getVideoConfig(): MediaStreamConstraints {
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

  static draw(video: HTMLVideoElement) {
    video.height = video.videoHeight;
    video.width = video.videoWidth;
    video.style.height = CAMERA_DISPLAY_HEIGHT;
    video.style.width = CAMERA_DISPLAY_WIDTH;
    video.style.transform = 'scaleX(-1)';
    video.style.position = 'fixed';
    video.style.top = '16px';
    video.style.left = '16px';
    video.style.zIndex = MAX_Z_INDEX;
    video.style.display = 'none';
    video.id = 'hm-camera-display';
    document.body.append(video);

    video.play();
  }
  static show() {
    document.getElementById('hm-camera-display').style.display = 'block';
  }
  static hide() {
    document.getElementById('hm-camera-display').style.display = 'none';
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

    // Permissão da Câmera
    await new Promise((resolve) => {
      camera.video.onloadedmetadata = () => {
        resolve(camera.video);
      };
    });

    return camera.video;
  }
}
