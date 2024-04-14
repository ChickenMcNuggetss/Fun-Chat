interface IRequest {
  id: string | null;
  type: string;
  payload: object;
}

const URL = 'ws://127.0.0.1:4000/';

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

  authenticateUser(login: string, password: string) {
    const data: IRequest = {
      id: null,
      type: 'USER_LOGIN',
      payload: {
        user: {
          login,
          password,
        },
      },
    };
    this.socket.send(JSON.stringify(data));
    console.log(data);
  }

  sendLogoutRequest(login: string, password: string) {
    const data: IRequest = {
      id: null,
      type: 'USER_LOGOUT',
      payload: {
        user: {
          login,
          password,
        },
      },
    };
    this.socket.send(JSON.stringify(data));
  }
}

export const socketService = new SocketService();
