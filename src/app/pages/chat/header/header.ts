import { Component } from '../../../components/base-component';
import { Button } from '../../../components/button';
import { socketService } from '../../../services/websocket-service';
import { setNavigation } from '../../../utilities/navigate';
import './header.css';

export class Header extends Component {
  constructor() {
    super({ tag: 'header', className: 'header container' });
    const userName = new Component({
      className: 'header__userName',
      text: sessionStorage.getItem('Name') || '',
    });
    const title = new Component({ tag: 'h1', className: 'header__title', text: 'Fun Chat' });
    const logOut = new Button({ className: 'header__log-out button', text: 'Log Out' });
    logOut.addListener('click', () => {
      const login = JSON.parse(JSON.stringify(sessionStorage.getItem('Name')));
      const password = JSON.parse(JSON.stringify(sessionStorage.getItem('Password')));
      socketService.sendLogoutRequest(login, password);
      sessionStorage.clear();
      setNavigation('login');
    });
    this.appendChildren([userName, title, logOut]);
  }
}
