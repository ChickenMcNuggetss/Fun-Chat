interface CompProps {
  tag: keyof HTMLElementTagNameMap;
  className: string;
  text?: string;
  parentNode?: HTMLElement | Component;
  attribute?: { key: string; value: string }[];
}

const DEFAULT_PROPS: CompProps = { tag: 'div', className: '', text: '' };

export class Component<T extends HTMLElement = HTMLElement> {
  protected node: T;

  constructor({
    tag = 'div',
    className = '',
    text = '',
    parentNode,
  }: Partial<CompProps> = DEFAULT_PROPS) {
    this.node = document.createElement(tag) as T;
    this.node.className = className;
    this.node.textContent = text;

    if (parentNode) {
      if (parentNode instanceof Component) {
        parentNode.append(this);
      } else {
        parentNode.append(this.node);
      }
    }
  }

  append(child: Component) {
    this.node.append(child.getNode());
  }

  appendChildren(children: Component[]) {
    children.forEach((el) => {
      this.append(el);
    });
  }

  removeNode() {
    this.node.remove();
  }

  getNode() {
    return this.node;
  }

  setTextContent(content: string) {
    this.node.textContent = content;
  }

  getTextContent() {
    return this.node.textContent;
  }

  setAttribute(attribute: string, value: string) {
    this.node.setAttribute(attribute, value);
  }

  removeAttribute(attribute: string) {
    this.node.removeAttribute(attribute);
  }

  setBackground(background: string) {
    this.node.style.backgroundImage = background;
  }

  addClass(className: string) {
    this.node.classList.add(className);
  }

  removeClass(className: string) {
    this.node.classList.remove(className);
  }

  addListener(event: string, listener: EventListener, options = false) {
    this.node.addEventListener(event, listener, options);
  }

  scrollIntoView() {
    this.node.scrollIntoView({ block: 'end' });
  }
}
