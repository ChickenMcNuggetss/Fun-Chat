import { Component } from '../../components/base-component';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { setNavigation } from '../../utilities/navigate';
import { socketService } from '../../services/websocket-service';
import './logIn.css';

export class LogIn extends Component {
  private inputName = new Input({
    className: 'log-in_input',
    id: 'Name',
    required: true,
    type: 'text',
    minLength: 3,
    pattern: '^[A-Z][a-zA-Z\\-]{2,}$',
  });

  private inputPassword = new Input({
    className: 'log-in_input',
    id: 'Password',
    required: true,
    type: 'password',
    minLength: 4,
    pattern: '^[A-Z][a-zA-Z\\-]{3,}$',
  });

  private buttonLogIn = new Button({
    className: 'log-in__button button',
    text: 'Log In',
    disabled: true,
  });

  private buttonAbout = new Button({
    className: 'log-in__button button',
    text: 'About',
  });

  private title = new Component({
    tag: 'h1',
    className: 'log-in__title',
    text: 'Log In',
  });

  private labelPassword: Component<HTMLElement>;

  private labelName: Component<HTMLElement>;

  constructor() {
    super({ tag: 'div', className: 'wrapper' });
    this.labelName = this.makeFirstNameLabel();
    this.labelPassword = this.makeSurnameLabel();
    this.buttonAbout.addListener('click', () => setNavigation('about'));
    this.append(this.makeForm());
  }

  private makeForm() {
    const formBox = new Component({
      tag: 'form',
      className: 'log-in__form-box box',
    });
    this.inputName.addListener('input', () => {
      this.handleButtonState(this.inputName.setValidity(), this.inputPassword.checkValidity());
    });
    this.inputPassword.addListener('input', () => {
      this.handleButtonState(this.inputName.checkValidity(), this.inputPassword.setValidity());
    });
    this.buttonLogIn.addListener('click', (e) => {
      e.preventDefault();
      sessionStorage.setItem('Name', `${this.inputName.getNode().value}`);
      sessionStorage.setItem('Password', `${this.inputPassword.getNode().value}`);
      setNavigation('chat');
      socketService.authenticateUser(
        this.inputName.getNode().value,
        this.inputPassword.getNode().value
      );
    });
    formBox.appendChildren([
      this.title,
      this.labelName,
      this.inputName,
      this.labelPassword,
      this.inputPassword,
      this.buttonLogIn,
      this.buttonAbout,
    ]);

    return formBox;
  }

  private makeFirstNameLabel() {
    this.labelName = new Component({
      tag: 'label',
      className: 'log-in__label',
      text: 'Name:',
    });
    this.labelName.setAttribute('for', 'Name');

    return this.labelName;
  }

  private makeSurnameLabel() {
    this.labelPassword = new Component({
      tag: 'label',
      className: 'log-in__label',
      text: 'Password:',
    });
    this.labelPassword.setAttribute('for', 'Password');

    return this.labelPassword;
  }

  private handleButtonState(isNameValid: boolean, isPasswordValid: boolean) {
    this.buttonLogIn.setDisabledState(isNameValid === false || isPasswordValid === false);
  }
}
