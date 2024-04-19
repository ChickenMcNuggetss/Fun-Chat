import { socketService } from './websocket-service';

class UserService {
  // eslint-disable-next-line class-methods-use-this
  authenticateUser(name: string, password: string) {
    sessionStorage.setItem('Name', `${name}`);
    sessionStorage.setItem('Password', `${password}`);
    socketService.authenticateUser(
      JSON.parse(JSON.stringify(sessionStorage.getItem('Name'))),
      JSON.parse(JSON.stringify(sessionStorage.getItem('Password')))
    );
  }
}

export const userService = new UserService();
