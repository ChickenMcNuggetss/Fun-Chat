import { Component } from '../../components/base-component';
import { WsMessage } from '../../enums/ws-message';
import { IAllAuthUsers, Responses } from '../../interfaces/socket-response';
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
    const usersList = new Component({ className: 'users-list' });
    this.usersList = usersList;
    this.append(this.usersList);
    socketService.subscribeListener(WsMessage.USER_ACTIVE, this.loadAuthUsers);
    socketService.getAllAuthUsers();
  }

  loadAuthUsers(data: Responses) {
    const response = data as IAllAuthUsers;
    // if (response.users.length === 0) {
    //   const element = new Component({ className: 'warning', text: 'There is no one here yet' });
    //   this.append(element);
    // } else {
    response.users.forEach((user: IUser) => {
      const card = new UserCard();
      const status = setStatusFunc(user.isLogined);
      card.setStatus(status);
      card.setName(user.login);
      this.usersList.append(card);
    });
    // }
  }
}
