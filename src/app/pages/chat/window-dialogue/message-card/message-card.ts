import { Component } from '../../../../components/base-component';
import './message-card.css';

export class MessageCard extends Component {
  private time = new Component({ className: 'message-card__time' });

  private senderUsername = new Component({ className: 'message-card__sender' });

  private status = new Component({ className: 'message-card__status' });

  private messageContainer = new Component({ className: 'message-card__text' });

  private indicator = new Component({ className: 'message-card__edit-indicator' });

  constructor() {
    super({ className: 'message-card__wrapper' });
    const container = new Component({ className: 'message-card__container' });
    container.appendChildren([this.senderUsername, this.time]);
    const statusContainer = new Component({ className: 'message-card__container' });
    statusContainer.appendChildren([this.status, this.indicator]);
    this.appendChildren([container, this.messageContainer, statusContainer]);
  }

  setTime(time: string) {
    this.time.setTextContent(time);
  }

  setSenderUsername(username: string) {
    this.senderUsername.setTextContent(username);
  }

  setMessage(text: string) {
    this.messageContainer.setTextContent(text);
  }

  setIndicator(indicator: string) {
    this.indicator.setTextContent(indicator);
  }

  setStatus(status: string) {
    this.status.setTextContent(status);
  }
}
