import { Component } from './components/base-component';
import { Router, createRouter } from './router';
import './style.css';

export class App {
  private container: HTMLElement;

  private router: Router | null;

  constructor() {
    this.container = document.body;
    this.router = null;
  }

  start() {
    const elementContainer = new Component({ className: 'app__el-container' });
    this.container.append(elementContainer.getNode());
    this.router = createRouter(elementContainer.getNode());
  }
}
