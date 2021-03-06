import { IObject } from '@models/common.model';

export const domService = {
  createNav(): HTMLElement {
    const title: HTMLElement = this.createEl('nav', {
      className: 'nav'
    });
    return title;
  },
  createLink(
    content: string,
    data: IObject,
    attr: { href: string }
  ): HTMLLinkElement {
    const title: HTMLLinkElement = this.createEl('a', {
      className: 'nav-link',
      content,
      data,
      attr
    });
    return title;
  },
  createTitle(content: string): HTMLHeadingElement {
    const title: HTMLHeadingElement = this.createEl('h1', {
      className: 'title',
      content
    });
    return title;
  },
  createContainer(): HTMLDivElement {
    const container: HTMLDivElement = this.createEl('div', {
      className: 'container'
    });
    return container;
  },
  createRow(): HTMLDivElement {
    const row: HTMLDivElement = this.createEl('div', {
      className: 'row'
    });
    return row;
  },

  createCol(base: number, { xl }: { xl: number }): HTMLDivElement {
    const classXl = xl ? ' col-xl-' + xl : '';
    const col: HTMLDivElement = this.createEl('div', {
      className: 'col' + '-' + base + classXl
    });
    return col;
  },

  createButtonBlock(content: string, data: IObject): HTMLButtonElement {
    const btn: HTMLButtonElement = this.createEl('button', {
      className: 'btn btn-lg btn-block',
      content,
      data
    });
    return btn;
  },

  createEl(
    elType: string,
    { className, content, data, attr }: blockConfig
  ): HTMLElement {
    const block: HTMLElement = document.createElement(elType);
    if (className) {
      block.className = className;
    }
    if (content) {
      block.innerText = content;
    }
    for (let key in data) {
      block.dataset[key] = data[key];
    }
    for (let key in attr) {
      block.setAttribute(key, data[key]);
    }
    return block;
  },

  emptyBlock(block: HTMLElement): void {
    while (block.firstChild) {
      block.removeChild(block.firstChild);
    }
  }
};

interface blockConfig {
  className?: string;
  content?: string;
  data?: IObject;
  attr?: IObject;
}
