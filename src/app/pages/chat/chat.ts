import { Component } from '../../components/base-component';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import './chat.css';
import { UsersList } from '../list-of-users/users-list';

export class Chat extends Component {
  private header = new Header();

  private userListContainer = new Component({ tag: 'div', className: 'chat__user-list-container' });

  private usersList = new UsersList();

  private footer = new Footer();

  constructor() {
    super({ tag: 'div', className: 'chat__wrapper wrapper' });
    const chatContainer = new Component({ className: 'chat__container' });
    this.userListContainer.append(this.usersList);
    chatContainer.appendChildren([this.header, this.userListContainer, this.footer]);
    this.append(chatContainer);
  }
}
