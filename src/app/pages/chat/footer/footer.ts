import { Component } from '../../../components/base-component';
import { Link } from '../../link/link';
import './footer.css';

export class Footer extends Component {
  constructor() {
    super({ tag: 'footer', className: 'footer container' });
    const schoolName = new Component({ className: 'footer__school-name', text: 'RSSchool' });
    const year = new Component({ className: 'footer__year', text: '2024' });
    const link = new Link('https://github.com/ChickenMcNuggetss', 'ChickenMcNuggetss');
    this.appendChildren([schoolName, link, year]);
  }
}
