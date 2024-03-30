/* eslint-disable @typescript-eslint/no-empty-interface */
import Toastify from 'toastify-js';
import { staticImplements } from '@utils/staticImplements';

import 'toastify-js/src/toastify.css';

export enum NotificationMessageType {
  info,
  success,
  warn,
  error,
}

interface INotificationService {}

interface IStaticNotificationService {
  new (): INotificationService;
  info(message: string): void;
  success(message: string): void;
  warning(message: string): void;
  error(message: string): void;
}

@staticImplements<IStaticNotificationService>()
export class NotificationService {
  static info(message: string): void {
    this.show(message, NotificationMessageType.info)
  }

  static success(message: string): void {
    this.show(message, NotificationMessageType.success)
  }

  static warning(message: string): void {
    this.show(message, NotificationMessageType.warn)
  }

  static error(message: string): void {
    this.show(message, NotificationMessageType.error)
  }

  private static show(
    message: string,
    type: NotificationMessageType,
  ): void {
    Toastify({
      text: message,
      close: true,
      position: 'left',
      duration: 3000,
      style: {
        background: this.getBackgroundColor(type),
      },
    }).showToast();
  }

  private static getBackgroundColor(type: NotificationMessageType): string {
    switch (type) {
      case NotificationMessageType.warn:
        return '#F2C94C';
      case NotificationMessageType.error:
        return '#EB5757';
      case NotificationMessageType.info:
        return '#2F80ED';
      case NotificationMessageType.success:
        return '#6FCF97';
    }
  }
}
