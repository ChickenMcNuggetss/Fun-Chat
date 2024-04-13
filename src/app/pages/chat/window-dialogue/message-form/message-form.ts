import { Component } from '../../../../components/base-component';
import { Button } from '../../../../components/button';
import { Input } from '../../../../components/input';

export class MessageForm extends Component {
  private inputText = new Input({ className: 'message-form__input' });

  private button = new Button({ className: 'message-form__button', text: 'Send' });

  constructor() {
    super({ tag: 'div', className: 'message-form__wrapper' });
    const messageForm = new Component({ tag: 'form', className: 'message-form' });
    messageForm.appendChildren([this.inputText, this.button]);
    this.append(messageForm);
  }
}
