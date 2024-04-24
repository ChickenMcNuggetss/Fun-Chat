import { Component } from './base-component';

interface IInput {
  className: string;
  id?: string;
  parentNode?: HTMLElement | Component;
  required?: boolean;
  type?: string;
  disabled?: boolean;
  minLength?: number;
  pattern?: string;
  onInput?: () => void;
}

function isValid(validityState: ValidityState): boolean {
  let isValidState = true;
  // eslint-disable-next-line no-restricted-syntax
  for (const key in validityState) {
    if (
      validityState[key as keyof ValidityState] === true &&
      key !== 'customError' &&
      key !== 'valid'
    ) {
      isValidState = false;
    }
  }
  return isValidState;
}

export class Input extends Component<HTMLInputElement> {
  constructor({
    className,
    id,
    required,
    type,
    disabled,
    pattern,
    minLength,
    parentNode,
    onInput,
  }: IInput) {
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
    if (pattern) {
      this.node.pattern = pattern;
    }
    if (minLength) {
      this.setAttribute('minlength', `${minLength}`);
    }
    if (required) {
      this.node.required = required;
    }
    if (onInput) {
      this.node.oninput = onInput;
      this.node.addEventListener('click', this.node.oninput);
    }
  }

  checkValidity() {
    return isValid(this.node.validity);
  }

  setValidity() {
    const isInputValid = this.checkValidity();
    if (!isInputValid) {
      this.node.setCustomValidity(
        `Set valid input. The first letter in uppercase. Min length: ${this.node.minLength}`
      );
    } else {
      this.node.setCustomValidity('');
    }
    this.node.reportValidity();
    return isInputValid;
  }

  getValue() {
    return this.node.value;
  }

  clearValue() {
    this.node.value = '';
  }
}
