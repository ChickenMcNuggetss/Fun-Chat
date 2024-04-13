import { Component } from '../../../components/base-component';
import { MessageForm } from './message-form/message-form';
import { DialogueTitle } from './dialogue-title/dialogue-title';

export class WindowDialogue extends Component {
  private messageForm = new MessageForm();

  private dialogueTitle = new DialogueTitle();

  constructor() {
    super({ tag: 'div', className: 'window-dialogue__wrapper' });
    this.appendChildren([this.dialogueTitle, this.messageForm]);
  }
}
