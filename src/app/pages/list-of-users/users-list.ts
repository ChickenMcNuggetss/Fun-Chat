import { Component } from '../../components/base-component';
import { WsMessage } from '../../enums/ws-message';
import { IAllUsers, IUserPayloadResp, Responses } from '../../interfaces/socket-response';
import { socketService } from '../../services/websocket-service';
import { UserCard } from './user-card/user-card';

interface IUser {
  login: string;
  isLogined: boolean;
}

function setStatusFunc(status: boolean) {
  if (status) return 'Active';
  return 'Idle';
}

export class UsersList extends Component {
  private usersList: Component;

  constructor() {
    super({ tag: 'div', className: 'users-list__wrapper' });
    const usersList = new Component({ tag: 'div', className: 'users-list' });
    this.usersList = usersList;
    this.append(this.usersList);
    socketService.subscribeListener(WsMessage.USER_ACTIVE, this.loadUsers);
    socketService.subscribeListener(WsMessage.USER_INACTIVE, this.loadUsers);
    socketService.subscribeListener(WsMessage.USER_EXTERNAL_LOGIN, this.loadExternalUsers);
    socketService.subscribeListener(WsMessage.USER_EXTERNAL_LOGOUT, this.loadExternalUsers);
    socketService.getAllAuthUsers();
    socketService.getAllUnauthUsers();
  }

  loadUsers = (data: Responses) => {
    const response = data as IAllUsers;
    // if (response.users.length === 0) {
    //   const element = new Component({ className: 'warning', text: 'There is no one here yet' });
    //   this.append(element);
    // } else {}
    console.log(response.users);
    response.users.forEach((user: IUser) => {
      const card = new UserCard();
      const status = setStatusFunc(user.isLogined);
      card.setStatus(status);
      card.setName(user.login);
      this.usersList.append(card);
    });
  };

  loadExternalUsers = (data: Responses) => {
    const response = data as IUserPayloadResp;
    const externalUser = response.user;
    const card = new UserCard();
    const status = setStatusFunc(externalUser.isLogined);
    card.setStatus(status);
    card.setName(externalUser.login);
    this.usersList.append(card);
  };
}
