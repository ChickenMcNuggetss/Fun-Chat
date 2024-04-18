/* eslint-disable no-console */
import { WsMessage } from '../enums/ws-message';
import { IUser } from '../interfaces/socket-request';
import { Responses } from '../interfaces/socket-response';
import { EventEmitter } from './event-emitter';
// import { Responses } from '../interfaces/socket-response';

const URL = 'ws://127.0.0.1:4000/';

function serializeData<T>(type: WsMessage, payload: T) {
  return JSON.stringify({ id: '', type, payload });
}

// function parseData<S>() {
//   return
// }

export class SocketService extends EventEmitter<Responses> {
  private socket: WebSocket;

  constructor() {
    super();
    this.socket = new WebSocket(URL);

    this.socket.addEventListener('open', (event: Event) => {
      console.log(event, 'Success');
    });

    this.socket.addEventListener('message', (event: MessageEvent<string>) => {
      const data = JSON.parse(event.data);
      this.emitEvent(data.type, data.payload);
    });

    this.socket.addEventListener('error', (event: Event) => {
      console.log(event, event.type);
    });

    this.socket.addEventListener('close', (event: Event) => {
      console.log(event);
    });
  }

  public authenticateUser(login: string, password: string) {
    const data = serializeData<IUser>(WsMessage.USER_LOGIN, {
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
    const data = serializeData<IUser>(WsMessage.USER_LOGOUT, {
      user: {
        login,
        password,
      },
    });
    // console.log(data, 'logout');
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
    this.socket.send(data);
  }
}

export const socketService = new SocketService();
