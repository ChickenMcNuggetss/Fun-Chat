import { Component } from '../../../components/base-component';
import { Observable } from '../../../utilities/observable';
import './user-card.css';

export class UserCard extends Component {
  private status = new Component({
    tag: 'span',
    className: 'user-card__status',
  });

  private name = new Component({
    tag: 'span',
    className: 'user-card__name',
  });

  constructor() {
    super({ tag: 'div', className: 'user-card__wrapper' });
    this.appendChildren([this.status, this.name]);
  }

  setStatus(content: string) {
    this.status.setTextContent(content);
  }

  setName(content: string) {
    this.name.setTextContent(content);
  }
}
