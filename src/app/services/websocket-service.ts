/* eslint-disable no-console */
import { WsMessage } from '../enums/ws-message';
import { IUser } from '../interfaces/socket-request';

const URL = 'ws://127.0.0.1:4000/';

function serializeData<T>(type: WsMessage, payload: T) {
  return JSON.stringify({ id: '', type, payload });
}

export class SocketService {
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket(URL);

    this.socket.addEventListener('open', (event: Event) => {
      console.log(event, 'Success');
    });

    this.socket.addEventListener('message', (event: Event) => {
      console.log(event);
    });

    this.socket.addEventListener('error', (event: Event) => {
      console.log(event, event.type);
    });

    this.socket.addEventListener('close', (event: Event) => {
      console.log(event);
    });
  }

  public authenticateUser(login: string, password: string) {
    const data = serializeData<IUser>(WsMessage.USER_LOGOUT, {
      user: {
        login,
        password,
      },
    });
    this.socket.send(data);
  }

  public sendLogoutRequest(login: string, password: string) {
    const data = serializeData<IUser>(WsMessage.USER_LOGOUT, {
      user: {
        login,
        password,
      },
    });
    this.socket.send(data);
  }

  public getAllAuthUsers() {
    const data = serializeData<null>(WsMessage.USER_ACTIVE, null);
    this.socket.send(data);
  }

  public getAllUnauthUsers() {
    const data = serializeData<null>(WsMessage.USER_INACTIVE, null);
    this.socket.send(data);
  }
}

export const socketService = new SocketService();
