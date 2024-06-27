import { Component } from '../../components/base-component';
import { Input } from '../../components/input';
import { IUser } from '../../interfaces/socket-response';
import { userService } from '../../services/user-service';
import { socketService } from '../../services/websocket-service';
import { setStatusFunc } from '../../utilities/status';
import { UserCard } from './user-card/user-card';
import './users-list.css';

export class UsersList extends Component {
  private usersList: Component;

  private prevComponent: UserCard[] | null = null;

  constructor() {
    super({ tag: 'div', className: 'users-list__wrapper' });
    const search = new Input({ className: 'users-list__search' });
    const usersList = new Component({ tag: 'div', className: 'users-list' });
    this.usersList = usersList;
    const inputContainer = new Component({ className: 'users-list__input-container' });
    inputContainer.append(search);
    this.appendChildren([inputContainer, this.usersList]);
    search.addListener('input', () => {
      const user = userService.userFilter(search.getValue());
      this.addUsers(user);
    });
    const userListObservable = userService.getUsersList();
    userListObservable.subscribe((users) => {
      this.addUsers(users);
    });
  }

  addUsers(array: IUser[]) {
    this.prevComponent?.forEach((el) => {
      el.removeNode();
    });
    const currentComps: UserCard[] = [];
    const name = sessionStorage.getItem('Name');
    array.forEach((user: IUser) => {
      if (name) {
        if (name !== user.login) {
          const card = new UserCard();
          const status = setStatusFunc(user.isLogined);
          card.addListener('click', () => {
            sessionStorage.setItem('loginDialogue', `${user.login}`);
            sessionStorage.setItem('statusDialogue', `${status}`);
            userService.getUserData().notify([user.login, status]);
            socketService.fetchMessageHistory(user.login);
          });
          card.setStatus(status);
          card.setName(user.login);
          currentComps.push(card);
          this.usersList.append(card);
        }
      }
    });
    this.prevComponent = currentComps;
  }
}
