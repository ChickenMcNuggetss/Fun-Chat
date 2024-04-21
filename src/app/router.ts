import { Component } from './components/base-component';
import { userService } from './services/user-service';

export interface Route {
  name: string;
  component: () => Promise<Component>;
}

export const enum RoutesApp {
  LogIn = 'login',
  About = 'about',
  Chat = 'chat',
}

const routesList: Array<Route> = [
  {
    name: RoutesApp.LogIn,
    component: async () => {
      const { LogIn } = await import('./pages/logIn/logIn');
      return new LogIn();
    },
  },
  {
    name: RoutesApp.About,
    component: async () => {
      const { About } = await import('./pages/about/about');
      return new About();
    },
  },
  {
    name: RoutesApp.Chat,
    component: async () => {
      const { Chat } = await import('./pages/chat/chat');
      return new Chat();
    },
  },
];

export class Router {
  constructor(
    private routes: Route[],
    private loadSelectedHash: (route: Route) => void,
    private defaultComponent?: () => Promise<Component>
  ) {
    window.addEventListener('hashchange', this.initHash.bind(this));
    this.initHash();
  }

  initHash() {
    const route = this.routes.find((unit) => unit.name === window.location.hash.slice(1));
    if (route) {
      if (route.name !== 'chat' || userService.getUserStatus().getValue() === 'true') {
        this.loadSelectedHash(route);
      }
    } else if (this.defaultComponent) {
      this.loadSelectedHash({ name: RoutesApp.LogIn, component: this.defaultComponent });
    }
  }
}

export function createRouter(wrapper: HTMLElement) {
  let previousComponent: Component | null = null;
  return new Router(
    routesList,
    (route) => {
      if (route) {
        route.component().then((component) => {
          previousComponent?.removeNode();
          previousComponent = component;
          wrapper.appendChild(component.getNode());
        });
      }
    },
    async () => {
      const { LogIn } = await import('./pages/logIn/logIn');
      return new LogIn();
    }
  );
}
