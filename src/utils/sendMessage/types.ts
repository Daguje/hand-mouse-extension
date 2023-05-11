export interface Message {
  [key: string]: string | number | boolean | Message;
}
