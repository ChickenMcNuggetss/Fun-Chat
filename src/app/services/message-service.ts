import { WsMessage } from '../enums/ws-message';
import {
  IMessage,
  IRespMessage,
  IRespMessageHistory,
  Responses,
} from '../interfaces/socket-response';
import { Observable } from '../utilities/observable';
import { socketService } from './websocket-service';

class MessageService {
  private messages = new Observable<IMessage[]>([]);

  constructor() {
    socketService.subscribeListener(WsMessage.MSG_SEND, this.receiveMessage);
    socketService.subscribeListener(WsMessage.MSG_FROM_USER, this.receiveMessages);
  }

  receiveMessage = (data: Responses) => {
    const response = data as IRespMessage;
    const message = response.message as IMessage;
    this.messages.notify((prev) => [...prev, message]);
  };

  receiveMessages = (data: Responses) => {
    const messages = data as IRespMessageHistory;
    this.messages.notify([]);
    messages.messages.forEach((el: IMessage) => {
      this.messages.notify((prev) => [...prev, el]);
    });
  };

  getMessage() {
    return this.messages;
  }
}

export const messageService = new MessageService();
