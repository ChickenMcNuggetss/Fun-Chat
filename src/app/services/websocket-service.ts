import { WsMessage } from '../enums/ws-message';
import { IMessageSended, IMessageHistory, IUserRequest } from '../interfaces/socket-request';
import { Responses } from '../interfaces/socket-response';
import { EventEmitter } from './event-emitter';

const URL = 'ws://127.0.0.1:4000/';

function serializeData<T>(type: WsMessage, payload: T) {
  return JSON.stringify({ id: '', type, payload });
}

export class SocketService extends EventEmitter<Responses> {
  private socket: WebSocket;

  constructor() {
    super();
    this.socket = new WebSocket(URL);

    this.socket.addEventListener('open', () => {
      if (window.location.hash === '#chat') {
        const name = sessionStorage.getItem('Name');
        const password = sessionStorage.getItem('Password');
        if (name && password) {
          this.authenticateUser(name, password);
        }
        this.getAllAuthUsers();
        this.getAllUnauthUsers();
        const partner = sessionStorage.getItem('loginDialogue');
        if (partner) {
          this.fetchMessageHistory(partner);
        }
      }
    });

    this.socket.addEventListener('message', (event: MessageEvent<string>) => {
      const data = JSON.parse(event.data);
      this.emitEvent(data.type, data.payload);
    });
  }

  public authenticateUser(login: string, password: string) {
    const data = serializeData<IUserRequest>(WsMessage.USER_LOGIN, {
      user: {
        login,
        password,
      },
    });
    if (this.socket.readyState === 1) {
      this.socket.send(data);
    }
  }

  public sendLogoutRequest(login: string, password: string) {
    const data = serializeData<IUserRequest>(WsMessage.USER_LOGOUT, {
      user: {
        login,
        password,
      },
    });
    this.socket.send(data);
  }

  public getAllAuthUsers() {
    const data = serializeData<null>(WsMessage.USER_ACTIVE, null);
    if (this.socket.readyState === 1) {
      this.socket.send(data);
    }
  }

  public getAllUnauthUsers() {
    const data = serializeData<null>(WsMessage.USER_INACTIVE, null);
    if (this.socket.readyState === 1) {
      this.socket.send(data);
    }
  }

  public sendMessage(to: string, text: string) {
    const data = serializeData<IMessageSended>(WsMessage.MSG_SEND, {
      message: {
        to,
        text,
      },
    });
    if (this.socket.readyState === 1) {
      this.socket.send(data);
    }
  }

  public fetchMessageHistory(login: string) {
    const data = serializeData<IMessageHistory>(WsMessage.MSG_FROM_USER, {
      user: {
        login,
      },
    });
    if (this.socket.readyState === 1) {
      this.socket.send(data);
    }
  }
}

export const socketService = new SocketService();
