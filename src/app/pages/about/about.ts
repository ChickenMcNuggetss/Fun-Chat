import { Component } from '../../components/base-component';
import { Button } from '../../components/button';
import { setNavigation } from '../../utilities/navigate';
import { DESCRIPTION } from '../../utilities/constants';

export class About extends Component {
  constructor() {
    super({ tag: 'div', className: 'about__wrapper wrapper' });
    const button = new Button({ className: 'about__button button', text: 'Get back' });
    button.addListener('click', () => setNavigation('login'));
    const about = new Component({ className: 'about_text', text: DESCRIPTION });
    const title = new Component({ tag: 'h1', className: 'title', text: 'Fun Chat' });
    const container = new Component({ className: 'about__container box' });
    container.appendChildren([title, about, button]);
    this.append(container);
  }
}
