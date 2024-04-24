import { Component } from '../../../../components/base-component';
import { IMessage } from '../../../../interfaces/socket-response';
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

  addMessages(data: IMessage[]) {
    this.prevComponent?.forEach((el) => {
      el.removeNode();
    });
    const currentComps: MessageCard[] = [];
    const loginDialogue = sessionStorage.getItem('loginDialogue');
    const currentUser = sessionStorage.getItem('Name');
    data.forEach((message: IMessage) => {
      if (
        (loginDialogue === message.to && currentUser === message.from) ||
        (loginDialogue === message.from && currentUser === message.to)
      ) {
        const card = new MessageCard();
        const time = new Date(message.datetime).toLocaleString();
        card.getTime().setTextContent(time);
        card.getSenderUsername().setTextContent(message.from);
        card.getMessage().setTextContent(message.text);
        if (message.from === sessionStorage.getItem('Name')) {
          card.addClass('sended-message');
        } else {
          card.addClass('received-message');
        }
        currentComps.push(card);
        this.append(card);
      }
    });
    this.prevComponent = currentComps;
  }
}
