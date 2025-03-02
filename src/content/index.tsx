import '@webcomponents/custom-elements';
import { App } from './App';
import { createRoot } from 'react-dom/client';
import { getVideoDetails, type YTEvent } from '../lib/youtube';

const ELEMENT_NAME = 'yt-stamper';

document.addEventListener(
  'keydown',
  (e) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape', 'Tab', 'Control', 'Shift', 'z', 'Z'].includes(e.key)) {
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

customElements.define(ELEMENT_NAME, YTStamperElement);

// yt-navigate-start 時に yt-stamper を削除する
document.addEventListener('yt-navigate-start', () => {
  const container = document.querySelector('#secondary-inner');
  const ytStamperElement = document.querySelector(ELEMENT_NAME);
  if (container && ytStamperElement) {
    container.removeChild(ytStamperElement);
  }
});

// yt-navigate-finish 時に yt-stamper を追加する
document.addEventListener('yt-navigate-finish', (e) => {
  const videoDetails = getVideoDetails(e as YTEvent);
  (window as any).__YT_STAMPER_DATA__ = { videoDetails };

  const observer = new MutationObserver((_mutations, obs) => {
    const container = document.querySelector('#secondary-inner');
    if (container) {
      // yt-stamper が既に存在する場合は削除
      const ytStamperElement = document.querySelector(ELEMENT_NAME);
      if (ytStamperElement) {
        container.removeChild(ytStamperElement);
      }

      const chat = document.querySelector('#chat');
      const playlist = document.querySelector('#playlist');
      // chat または playlist がレンダリングされたあとに yt-stamper を追加する
      if (chat || playlist?.getAttribute('hidden') === null) {
        obs.disconnect();
        clearTimeout(timerId);
        container.prepend(document.createElement(ELEMENT_NAME));
      }
    }
  });

  const timerId = setTimeout(() => {
    observer.disconnect();
    const container = document.querySelector('#secondary-inner');
    if (container) {
      // yt-stamper が既に存在する場合は削除
      const ytStamperElement = document.querySelector(ELEMENT_NAME);
      if (ytStamperElement) {
        container.removeChild(ytStamperElement);
      }

      container.prepend(document.createElement(ELEMENT_NAME));
    }
  }, 1000);

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
