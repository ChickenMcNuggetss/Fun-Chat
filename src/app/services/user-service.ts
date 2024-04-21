import { WsMessage } from '../enums/ws-message';
import { IAllUsers, IUser, IUserPayloadResp, Responses } from '../interfaces/socket-response';
import { Observable } from '../utilities/observable';
import { socketService } from './websocket-service';

class UserService {
  private usersList = new Observable<IUser[]>([]);

  private isLogined = new Observable<string>('false');

  constructor() {
    socketService.subscribeListener(WsMessage.USER_ACTIVE, this.loadUsers);
    socketService.subscribeListener(WsMessage.USER_INACTIVE, this.loadUsers);
    socketService.subscribeListener(WsMessage.USER_EXTERNAL_LOGIN, this.loadExternalUsers);
    socketService.subscribeListener(WsMessage.USER_EXTERNAL_LOGOUT, this.loadExternalUsers);
  }

  // eslint-disable-next-line class-methods-use-this
  public authenticateUser(name: string, password: string) {
    sessionStorage.setItem('Name', `${name}`);
    sessionStorage.setItem('Password', `${password}`);
    socketService.authenticateUser(
      JSON.stringify(sessionStorage.getItem('Name')),
      JSON.stringify(sessionStorage.getItem('Password'))
    );
  }

  loadUsers = (data: Responses) => {
    const response = data as IAllUsers;
    if (response.users.length !== 0) {
      response.users.forEach((el: IUser) => {
        this.usersList.notify((prev) => [...prev, el]);
      });
    }
  };

  loadExternalUsers = (data: Responses) => {
    const response = data as IUserPayloadResp;
    const externalUser = response.user as IUser;
    const list = this.usersList.getValue();
    this.usersList.notify([]);
    list.forEach((el, i) => {
      if (el.login === externalUser.login && el.isLogined !== externalUser.isLogined) {
        list.splice(i, 1);
      }
      if (el.login === externalUser.login && el.isLogined === externalUser.isLogined) {
        list.splice(i, 1);
      }
    });
    this.usersList.notify([...list, externalUser]);
  };

  public pushUserIntoList(user: IUser) {
    if (sessionStorage.getItem('Name') !== user.login) {
      this.usersList.notify((prev) => [...prev, user]);
    }
  }

  public getUsersList() {
    return this.usersList;
  }

  getUserStatus() {
    return this.isLogined;
  }

  userFilter(name: string) {
    return this.usersList.getValue().filter((user) => {
      return user.login === name;
    });
  }
}

export const userService = new UserService();
