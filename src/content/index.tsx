import '@webcomponents/custom-elements';
import { App } from './App';
import { createRoot } from 'react-dom/client';

const ELEMENT_NAME = 'yt-stamper';

document.addEventListener(
  'keydown',
  (e) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
      return;
    }

    // target が yt-stamper の場合
    if (e.target instanceof HTMLElement && e.target.nodeName === ELEMENT_NAME.toUpperCase()) {
      const composedPathZero = e.composedPath()[0];

      // input 要素によるイベントなら伝播を止める
      if (composedPathZero instanceof HTMLElement && composedPathZero.nodeName === 'INPUT') {
        e.stopImmediatePropagation();
      }
    }
  },
  true,
);

class YTStamperElement extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('index.css');
    shadowRoot.append(link);
  }

  connectedCallback() {
    if (this.shadowRoot) {
      const root = createRoot(this.shadowRoot);
      root.render(<App />);
    }
  }
}

const observer = new MutationObserver((_mutations, obs) => {
  const container = document.querySelector('#secondary-inner');
  if (container) {
    const chat = document.querySelector('#chat');
    const playlist = document.querySelector('#playlist');
    // chat または playlist がレンダリングされたあとに yt-stamper を追加する
    if (chat || playlist?.getAttribute('hidden') === null) {
      if (!customElements.get(ELEMENT_NAME)) {
        customElements.define(ELEMENT_NAME, YTStamperElement);
      }
      const ytStamperElement = document.createElement(ELEMENT_NAME);

      container.prepend(ytStamperElement);
      obs.disconnect();
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
