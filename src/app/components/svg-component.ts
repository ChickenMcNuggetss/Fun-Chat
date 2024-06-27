import { Component } from './base-component';

export class SvgComponent extends Component {
  constructor(private className: string) {
    super({ className: 'svg__wrapper' });
    const svgTag = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const useTag = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    svgTag.setAttributeNS(null, 'class', `${className}`);
    useTag.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      `./assets/sprite.svg#finish`
    );
    svgTag.append(useTag);
    this.node.append(svgTag);
  }
}
