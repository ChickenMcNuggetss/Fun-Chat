import { Component } from './components/base-component';

export interface Route {
  name: string;
  component: () => Promise<Component>;
}

export const enum RoutesApp {
  LogIn = 'login',
  Info = 'info',
}

const routesList: Array<Route> = [
  {
    name: RoutesApp.LogIn,
    component: async () => {
      const { LogIn } = await import('./pages/logIn/logIn');
      return new LogIn();
    },
  },
  // {
  //   name: RoutesApp.Info,
  //   component: async () => {
  //     const { Winners } = await import('./pages/winners/winners');
  //     return new Winners();
  //   },
  // },
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
      this.loadSelectedHash(route);
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
