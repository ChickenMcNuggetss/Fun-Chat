import { Component } from '../../../../components/base-component';
import './message-card.css';

export class MessageCard extends Component {
  private time = new Component({ className: 'message-card__time' });

  private senderUsername = new Component({ className: 'message-card__sender' });

  private messageContainer = new Component({ className: 'message-card__text' });

  private indicator = new Component({ className: 'message-card__edit-indicator' });

  constructor() {
    super({ className: 'message-card__wrapper' });
    const container = new Component({ className: 'message-card__info-container' });
    container.appendChildren([this.senderUsername, this.time]);
    this.appendChildren([container, this.messageContainer, this.indicator]);
  }

  getTime() {
    return this.time;
  }

  getSenderUsername() {
    return this.senderUsername;
  }

  getMessage() {
    return this.messageContainer;
  }

  getIndicator() {
    return this.indicator;
  }
}
