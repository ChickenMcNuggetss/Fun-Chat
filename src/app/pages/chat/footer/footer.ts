import { Component } from '../../../components/base-component';
import './footer.css';

export class Footer extends Component {
  private schoolName = new Component({ className: 'footer__school-name', text: 'RSSchool' });

  private link = new Component({ tag: 'a', className: 'footer__link', text: 'ChickenMcNuggetss' });

  private year = new Component({ className: 'footer__year', text: '2023' });

  constructor() {
    super({ tag: 'footer', className: 'footer container' });
    this.link.setAttribute('href', 'https://github.com/ChickenMcNuggetss');
    this.appendChildren([this.schoolName, this.link, this.year]);
  }
}
