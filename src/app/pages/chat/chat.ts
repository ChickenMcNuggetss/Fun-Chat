import { Component } from '../../components/base-component';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import './chat.css';
import { UsersList } from '../list-of-users/users-list';
import { socketService } from '../../services/websocket-service';
import { WindowDialogue } from './window-dialogue/window-dialogue';

export class Chat extends Component {
  private header = new Header();

  private userListContainer = new Component({ tag: 'div', className: 'chat__user-list-container' });

  private usersList = new UsersList();

  private chat = new WindowDialogue();

  private footer = new Footer();

  constructor() {
    super({ tag: 'div', className: 'chat__wrapper wrapper' });
    const chatContainer = new Component({ className: 'chat__container' });
    const mainContainer = new Component({ className: 'chat__main-container' });
    socketService.getAllAuthUsers();
    socketService.getAllUnauthUsers();
    this.userListContainer.append(this.usersList);
    mainContainer.appendChildren([this.userListContainer, this.chat]);
    chatContainer.appendChildren([this.header, mainContainer, this.footer]);
    this.append(chatContainer);
  }
}
