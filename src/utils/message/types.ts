export interface Message<MessageType = unknown>
  extends MessageContent<MessageType> {
  from: MessageFrom;
}
export type MessageFrom = 'popup' | 'options' | 'content' | 'background' | 'app';

export type MessageContent<MessageType = unknown> = {
  [key: string]: string | number | boolean | MessageType;
};
