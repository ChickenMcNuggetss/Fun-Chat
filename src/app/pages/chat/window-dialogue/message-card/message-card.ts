import { Component } from '../../../../components/base-component';

export class MessageCard extends Component {
  private time = new Component({ className: 'message-card__time' });

  private senderUsername = new Component({ className: 'message-card__sender' });

  // private deliveryStatus = new Component({ className: 'message-card__status' });

  private messageText = new Component({ className: 'message-card__text' });

  private indicator = new Component({ className: 'message-card__edit-indicator' });

  constructor() {
    super({ className: 'message-card__wrapper' });
    const container = new Component({ className: 'message-card__info-container' });
    container.appendChildren([this.senderUsername, this.time]);
    this.appendChildren([container, this.messageText, this.indicator]);
  }
}
