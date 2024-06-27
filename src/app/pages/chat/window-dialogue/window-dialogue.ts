import { Component } from '../../../components/base-component';
import { MessageForm } from './message-form/message-form';
import { DialogueTitle } from './dialogue-title/dialogue-title';
import './window-dialogue.css';
import { DialogueHistory } from './dialogue-history/dialogue-history';

export class WindowDialogue extends Component {
  private messageForm = new MessageForm();

  private dialogue = new DialogueHistory();

  private dialogueTitle = new DialogueTitle();

  constructor() {
    super({ tag: 'div', className: 'window-dialogue__wrapper' });
    this.appendChildren([this.dialogueTitle, this.dialogue, this.messageForm]);
  }
}
