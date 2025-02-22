import { Component } from '../../components/base-component';
import { Button } from '../../components/button';
import { setNavigation } from '../../utilities/navigate';
import { DESCRIPTION } from '../../utilities/constants';
import './about.css';
import { Link } from '../link/link';

export class About extends Component {
  constructor() {
    super({ tag: 'div', className: 'about__wrapper wrapper' });
    const button = new Button({ className: 'about__button button', text: 'Get back' });
    button.addListener('click', () => setNavigation('login'));
    const about = new Component({ className: 'about_text', text: DESCRIPTION });
    const title = new Component({ tag: 'h1', className: 'title', text: 'Fun Chat' });
    const container = new Component({ className: 'about__container box' });
    const link = new Link('https://github.com/ChickenMcNuggetss', 'ChickenMcNuggetss');
    container.appendChildren([title, about, button, link]);
    this.append(container);
  }
}
