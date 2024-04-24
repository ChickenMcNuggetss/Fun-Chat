import { Component } from '../../../../components/base-component';
import { IRespMessage } from '../../../../interfaces/socket-response';
import { messageService } from '../../../../services/message-service';
import { MessageCard } from '../message-card/message-card';
import './dialogue-history.css';

export class DialogueHistory extends Component {
  private prevComponent: MessageCard[] | null = null;

  constructor() {
    super({ tag: 'div', className: 'dialogue-history' });
    messageService.getMessage().subscribe((data) => {
      this.addMessages(data);
    });
  }

  addMessages(data: IRespMessage[]) {
    this.prevComponent?.forEach((el) => {
      el.removeNode();
    });
    const currentComps: MessageCard[] = [];
    data.forEach((message) => {
      const card = new MessageCard();
      const time = new Date(message.message.datetime).toLocaleString();
      card.getTime().setTextContent(time);
      card.getSenderUsername().setTextContent(message.message.from);
      card.getMessage().setTextContent(message.message.text);
      if (message.message.from === sessionStorage.getItem('Name')) {
        card.addClass('sended-message');
      } else {
        card.addClass('received-message');
      }
      currentComps.push(card);
      this.append(card);
    });
    this.prevComponent = currentComps;
  }
}
