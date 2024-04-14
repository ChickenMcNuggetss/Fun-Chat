import { Component } from '../../../components/base-component';
import { Button } from '../../../components/button';
import { socketService } from '../../../services/websocket-service';
import { setNavigation } from '../../../utilities/navigate';
import './header.css';

export class Header extends Component {
  private userName = new Component({ className: 'header__userName' });

  private title = new Component({ tag: 'h1', className: 'header__title', text: 'Fun Chat' });

  private logOut = new Button({ className: 'header__log-out button', text: 'Log Out' });

  constructor() {
    super({ tag: 'header', className: 'header container' });
    this.logOut.addListener('click', () => {
      const login = JSON.parse(JSON.stringify(sessionStorage.getItem('Name')));
      const password = JSON.parse(JSON.stringify(sessionStorage.getItem('Password')));
      socketService.sendLogoutRequest(login, password);
      setNavigation('login');
    });
    this.appendChildren([this.userName, this.title, this.logOut]);
  }
}
