import { Component } from './base-component';

interface IButton {
  className: string;
  text: string;
  disabled?: boolean;
  parentNode?: HTMLElement | Component;
  onClick?: () => void;
}

export class Button extends Component<HTMLButtonElement> {
  constructor({ className, text, disabled, parentNode, onClick }: IButton) {
    super({ tag: 'button', className, text, parentNode });

    if (disabled) {
      this.node.disabled = disabled;
    }

    if (onClick) {
      this.node.onclick = onClick;
      this.node.addEventListener('click', this.node.onclick);
    }
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.node.setAttribute('disabled', 'disabled');
    } else {
      this.node.removeAttribute('disabled');
    }
  }
}
