import { Component } from '../../components/base-component';
import './link.css';

export class Link extends Component {
  constructor(link: string, linkText: string) {
    super({ tag: 'a', className: 'link', text: linkText });
    this.setAttribute('href', link);
  }
}
