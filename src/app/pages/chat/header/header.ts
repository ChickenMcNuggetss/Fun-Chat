import { Component } from '../../../components/base-component';
import { Button } from '../../../components/button';
import { socketService } from '../../../services/websocket-service';
import { setNavigation } from '../../../utilities/navigate';
import './header.css';

const USER_NAME = sessionStorage.getItem('Name');

export class Header extends Component {
  private userName = new Component({
    className: 'header__userName',
    text: JSON.stringify(USER_NAME),
  });

  private title = new Component({ tag: 'h1', className: 'header__title', text: 'Fun Chat' });

  private logOut = new Button({ className: 'header__log-out button', text: 'Log Out' });

  constructor() {
    super({ tag: 'header', className: 'header container' });
    this.logOut.addListener('click', () => {
      const login = JSON.parse(JSON.stringify(sessionStorage.getItem('Name')));
      const password = JSON.parse(JSON.stringify(sessionStorage.getItem('Password')));
      socketService.sendLogoutRequest(login, password);
      sessionStorage.clear();
      setNavigation('login');
    });
    this.appendChildren([this.userName, this.title, this.logOut]);
  }
}
