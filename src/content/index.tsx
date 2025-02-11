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

let currentId = '';

const handleHistoryChange = (message: { url: string }) => {
  if (currentId !== message.url) {
    currentId = message.url;

    const container = document.querySelector('#secondary-inner');
    const ytStamperElement = document.querySelector(ELEMENT_NAME);
    if (container && ytStamperElement) {
      container.removeChild(ytStamperElement);
    }

    const observer = new MutationObserver((_mutations, obs) => {
      const container = document.querySelector('#secondary-inner');
      if (container) {
        // yt-stamper が既に存在する場合は何もしない
        if (document.querySelector(ELEMENT_NAME)) {
          obs.disconnect();
          return;
        }

        const chat = document.querySelector('#chat');
        const playlist = document.querySelector('#playlist');
        // chat または playlist がレンダリングされたあとに yt-stamper を追加する
        if (chat || playlist?.getAttribute('hidden') === null) {
          const ytStamperElement = document.createElement(ELEMENT_NAME);
          container.prepend(ytStamperElement);
          obs.disconnect();
          clearTimeout(timerId);
        }
      }
    });

    const timerId = setTimeout(() => {
      const container = document.querySelector('#secondary-inner');
      if (container) {
        // yt-stamper が既に存在する場合は何もしない
        if (document.querySelector(ELEMENT_NAME)) {
          observer.disconnect();
          clearTimeout(timerId);
          return;
        }

        const ytStamperElement = document.createElement(ELEMENT_NAME);
        container.prepend(ytStamperElement);
        observer.disconnect();
      }
    }, 1000);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
};

customElements.define(ELEMENT_NAME, YTStamperElement);

chrome.runtime.onMessage.addListener(handleHistoryChange);
handleHistoryChange({ url: window.location.href });
