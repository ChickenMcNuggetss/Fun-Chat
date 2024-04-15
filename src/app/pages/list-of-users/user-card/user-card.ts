import { Component } from '../../../components/base-component';

export class UserCard extends Component {
  private status = new Component({ tag: 'span', className: 'user-card__status', text: '' });

  private name = new Component({ tag: 'span', className: 'user-card__name', text: '' });

  constructor() {
    super({ tag: 'div', className: 'user-card__wrapper' });
  }
}
