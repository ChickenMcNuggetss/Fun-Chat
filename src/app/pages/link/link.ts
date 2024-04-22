import { Component } from '../../components/base-component';
import './link.css';

export class Link extends Component {
  constructor() {
    super({ tag: 'a', className: 'link', text: 'ChickenMcNuggetss' });
    this.setAttribute('href', 'https://github.com/ChickenMcNuggetss');
  }
}
