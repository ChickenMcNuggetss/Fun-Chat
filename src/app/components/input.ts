import { Component } from './base-component';

interface IInput {
  className: string;
  id?: string;
  parentNode?: HTMLElement | Component;
  type?: string;
  disabled?: boolean;
  onInput?: () => void;
}

export class Input extends Component<HTMLInputElement> {
  constructor({ className, id, type, disabled, parentNode, onInput }: IInput) {
    super({ tag: 'input', className, parentNode });
    if (type) {
      this.setAttribute('type', type);
    }

    if (id) {
      this.setAttribute('id', id);
    }

    if (disabled) {
      this.node.disabled = disabled;
    }

    if (onInput) {
      this.node.oninput = onInput;
      this.node.addEventListener('click', this.node.oninput);
    }
  }
}
