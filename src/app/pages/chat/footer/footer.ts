import { Component } from '../../../components/base-component';
import { Link } from '../../link/link';
import './footer.css';

export class Footer extends Component {
  private schoolName = new Component({ className: 'footer__school-name', text: 'RSSchool' });

  private link = new Link();

  private year = new Component({ className: 'footer__year', text: '2024' });

  constructor() {
    super({ tag: 'footer', className: 'footer container' });
    this.appendChildren([this.schoolName, this.link, this.year]);
  }
}
