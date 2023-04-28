const startCamera = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: globalThis.screen.availWidth,
      height: globalThis.screen.availHeight,
      frameRate: {
        ideal: 60,
      },
    },
  });
  return stream;
};

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (!message) return;
  else if (message.status === 'requestVideo') {
    const video = document.getElementById('gugufodao') as HTMLVideoElement;
    const canvas = new OffscreenCanvas(video.width, video.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    const { data } = ctx.getImageData(0, 0, video.width, video.height);
    console.log(data);
    sendResponse({ video: data });
  } else {
    const video = document.createElement('video') as HTMLVideoElement;
    video.height = 240;
    video.width = 320;
    video.style.transform = 'scaleX(-1)';
    video.style.position = 'fixed';
    video.style.top = '16px';
    video.style.left = '16px';
    video.style.zIndex = '9999';
    video.id = 'gugufodao';

    document.body.append(video);
    const stream = await startCamera();
    video.srcObject = stream;
    await new Promise((resolve) => {
      video.onloadedmetadata = () => {
        resolve(video);
      };
    });

    video.play();
  }
  return true;
});
