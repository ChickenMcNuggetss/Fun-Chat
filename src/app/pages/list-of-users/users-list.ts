import { Component } from '../../components/base-component';
import { Input } from '../../components/input';
import { IUser } from '../../interfaces/socket-response';
import { userService } from '../../services/user-service';
import { UserCard } from './user-card/user-card';
import './users-list.css';

function setStatusFunc(status: boolean) {
  if (status) return 'Active';
  return 'Idle';
}

export class UsersList extends Component {
  private usersList: Component;

  private prevComponent: UserCard[] | null = null;

  private search = new Input({ className: 'users-list__search' });

  constructor() {
    super({ tag: 'div', className: 'users-list__wrapper' });
    const usersList = new Component({ tag: 'div', className: 'users-list' });
    this.usersList = usersList;
    const inputContainer = new Component({ className: 'users-list__input-container' });
    inputContainer.append(this.search);
    this.appendChildren([inputContainer, this.usersList]);
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
    console.log(JSON.parse(JSON.stringify(name)));
    array.forEach((user: IUser) => {
      if (name) {
        if (name !== user.login) {
          console.log(user);
          const card = new UserCard();
          const status = setStatusFunc(user.isLogined);
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
