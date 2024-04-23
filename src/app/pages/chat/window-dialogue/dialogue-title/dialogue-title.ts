import { Component } from '../../../../components/base-component';
import { userService } from '../../../../services/user-service';
import './dialogue-title.css';

export class DialogueTitle extends Component {
  private name = new Component({ className: 'title__name', text: '' });

  private status = new Component({ className: 'title__status', text: '' });

  constructor() {
    super({ tag: 'div', className: 'dialogue-title__wrapper' });
    userService.getUserData().subscribe((data) => {
      this.name.setTextContent(data[0]);
      this.status.setTextContent(data[1]);
    });
    this.appendChildren([this.name, this.status]);
  }
}
