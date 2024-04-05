import { NotificationService } from "@services/NotificationService";

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
    video.width = video.videoWidth
    video.height = video.videoHeight
    video.style.height = '100%'
    video.style.width = '100%'
    element.replaceChildren(video)
  }

  static async create() {
    NotificationService.info('Iniciando Câmera')
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      NotificationService.error('Não foi possível iniciar a Câmera')
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
        NotificationService.success('Câmera iniciado com sucesso!')
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