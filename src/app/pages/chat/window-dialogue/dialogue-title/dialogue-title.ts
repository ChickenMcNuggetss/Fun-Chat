import { Component } from '../../../../components/base-component';
import { userService } from '../../../../services/user-service';
import './dialogue-title.css';

export class DialogueTitle extends Component {
  constructor() {
    super({ tag: 'div', className: 'dialogue-title__wrapper' });
    const name = new Component({
      className: 'title__name',
      text: sessionStorage.getItem('loginDialogue') || '',
    });
    const status = new Component({
      className: 'title__status',
      text: sessionStorage.getItem('statusDialogue') || '',
    });
    userService.getUserData().subscribe((data) => {
      name.setTextContent(data[0]);
      status.setTextContent(data[1]);
    });
    this.appendChildren([name, status]);
  }
}
