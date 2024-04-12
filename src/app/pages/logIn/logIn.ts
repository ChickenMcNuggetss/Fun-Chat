import { Component } from '../../components/base-component';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
// import { setNavigation } from '../../utilities/navigate';
import './logIn.css';

export class LogIn extends Component {
  private inputFirstName = new Input({
    className: 'log-in_input',
    id: 'first-name',
    required: true,
    type: 'text',
    minLength: 3,
    pattern: '^[A-Z][a-zA-Z\\-]{2,}$',
  });

  private inputSurname = new Input({
    className: 'log-in_input',
    id: 'surname',
    required: true,
    minLength: 4,
    pattern: '^[A-Z][a-zA-Z\\-]{3,}$',
  });

  private buttonLogIn = new Button({
    className: 'log-in__button',
    text: 'Log In',
    disabled: true,
  });

  private title = new Component({
    tag: 'h1',
    className: 'log-in__title',
    text: 'Log In',
  });

  private labelSurname: Component<HTMLElement>;

  private labelFirstName: Component<HTMLElement>;

  constructor() {
    super({ tag: 'div', className: 'wrapper' });
    this.labelFirstName = this.makeFirstNameLabel();
    this.labelSurname = this.makeSurnameLabel();
    this.append(this.makeForm());
  }

  private makeForm() {
    const formBox = new Component({
      tag: 'form',
      className: 'log-in__form-box',
    });
    this.inputFirstName.addListener('input', () => {
      this.handleButtonState(this.inputFirstName.setValidity(), this.inputSurname.checkValidity());
    });
    this.inputSurname.addListener('input', () => {
      this.handleButtonState(this.inputFirstName.checkValidity(), this.inputSurname.setValidity());
    });
    this.buttonLogIn.addListener('click', (e) => {
      e.preventDefault();
      localStorage.setItem('FirstName', `${this.inputFirstName.getNode().value}`);
      localStorage.setItem('Surname', `${this.inputSurname.getNode().value}`);
      // setNavigation('');
    });
    formBox.appendChildren([
      this.title,
      this.labelFirstName,
      this.inputFirstName,
      this.labelSurname,
      this.inputSurname,
      this.buttonLogIn,
    ]);

    return formBox;
  }

  private makeFirstNameLabel() {
    this.labelFirstName = new Component({
      tag: 'label',
      className: 'log-in__label',
      text: 'First Name:',
    });
    this.labelFirstName.setAttribute('for', 'first-name');

    return this.labelFirstName;
  }

  private makeSurnameLabel() {
    this.labelSurname = new Component({
      tag: 'label',
      className: 'log-in__label',
      text: 'Surname:',
    });
    this.labelSurname.setAttribute('for', 'surname');

    return this.labelSurname;
  }

  private handleButtonState(isFirstNameValid: boolean, isSurnameValid: boolean) {
    this.buttonLogIn.setDisabledState(isFirstNameValid === false || isSurnameValid === false);
  }
}
