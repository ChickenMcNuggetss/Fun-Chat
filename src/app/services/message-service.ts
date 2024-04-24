import { WsMessage } from '../enums/ws-message';
import { IRespMessage, Responses } from '../interfaces/socket-response';
import { Observable } from '../utilities/observable';
import { socketService } from './websocket-service';

class MessageService {
  private messages = new Observable<IRespMessage[]>([]);

  constructor() {
    socketService.subscribeListener(WsMessage.MSG_SEND, this.receiveMessage);
  }

  // eslint-disable-next-line class-methods-use-this
  receiveMessage = (data: Responses) => {
    const message = data as IRespMessage;
    this.messages.notify((prev) => [...prev, message]);
  };

  getMessage() {
    return this.messages;
  }
}

export const messageService = new MessageService();
