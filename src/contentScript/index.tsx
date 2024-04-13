import "@webcomponents/custom-elements";
import { createRoot } from "react-dom/client";
import { App } from "./App";

class YTStamperElement extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL("contentScript.css");
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
  const container = document.querySelector("#secondary-inner");
  if (container) {
    customElements.define("yt-stamper-element", YTStamperElement);
    const ytStamperElement = document.createElement("yt-stamper-element");

    container.prepend(ytStamperElement);
    obs.disconnect();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
