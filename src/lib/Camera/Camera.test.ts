/**
 * @jest-environment jsdom
 */
import { Camera } from '.';

describe('Camera', () => {
  describe('Draw on Screen', () => {
    it('Should properly configure Video Element styles', () => {
      const videoElement = document.createElement('video');
      Camera.draw(videoElement);

      expect(videoElement.style.height).toBe('320px');
      expect(videoElement.style.width).toBe('240px');
      expect(videoElement.style.transform).toBe('scaleX(-1)');
      expect(videoElement.style.position).toBe('fixed');
      expect(videoElement.style.top).toBe('16px');
      expect(videoElement.style.left).toBe('16px');
      expect(videoElement.style.zIndex).toBe('2147483647');
      expect(videoElement.style.display).toBe('none');
    });

    it('Should append video element to document body', () => {
      const videoElement = document.createElement('video');
      jest.spyOn(document.body, 'append');
      Camera.draw(videoElement);

      expect(document.body.append).toHaveBeenCalledWith(videoElement);
    });

    it('Should play the video element', () => {
      const videoElement = document.createElement('video');

      jest
        .spyOn(HTMLMediaElement.prototype, 'play')
        .mockImplementation(() => Promise.resolve());
      Camera.draw(videoElement);

      expect(videoElement.play).toHaveBeenCalled();
    });
  });
});
