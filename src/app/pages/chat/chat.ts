import { Component } from '../../components/base-component';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import './chat.css';

export class Chat extends Component {
  private header = new Header();

  private footer = new Footer();

  constructor() {
    super({ tag: 'div', className: 'chat__wrapper wrapper' });
    const chatContainer = new Component({ className: 'chat__container' });
    chatContainer.appendChildren([this.header, this.footer]);
    this.append(chatContainer);
  }
}
