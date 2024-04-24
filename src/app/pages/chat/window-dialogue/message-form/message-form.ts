import { Component } from '../../../../components/base-component';
import { Button } from '../../../../components/button';
import { Input } from '../../../../components/input';
import { socketService } from '../../../../services/websocket-service';
import './message-form.css';

export class MessageForm extends Component {
  private inputText = new Input({ className: 'message-form__input' });

  private button = new Button({
    className: 'message-form__button button',
    text: 'Send',
    disabled: true,
  });

  constructor() {
    super({ tag: 'div', className: 'message-form__wrapper' });
    const messageForm = new Component({ tag: 'form', className: 'message-form' });
    messageForm.appendChildren([this.inputText, this.button]);
    this.inputText.addListener('input', () => {
      this.button.setDisabledState(false);
      if (this.inputText.getValue() === '') {
        this.button.setDisabledState(true);
      }
    });
    this.button.addListener('click', () => {
      const login = sessionStorage.getItem('loginDialogue');
      if (login) {
        socketService.sendMessage(login, this.inputText.getValue());
      }
      this.inputText.clearValue();
    });
    this.append(messageForm);
  }
}
