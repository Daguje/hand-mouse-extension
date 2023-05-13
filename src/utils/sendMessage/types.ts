export interface Message<MessageType> {
  [key: string]: string | number | boolean | Message<MessageType> | MessageType;
}
