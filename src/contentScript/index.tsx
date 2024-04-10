import "@webcomponents/custom-elements";
import { createRoot } from "react-dom/client";
import { YTStamper } from "./components/YTStamper";

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
			root.render(<YTStamper />);
		}
	}
}

const observer = new MutationObserver((_mutations, obs) => {
	const container = document.querySelector("#secondary-inner");
	if (container) {
		console.info("Find container.");

		customElements.define("yt-stamper-element", YTStamperElement);
		const ytStamperElement = document.createElement("yt-stamper-element");

		container.prepend(ytStamperElement);
		obs.disconnect();
	} else {
		console.error("Not find container.");
	}
});

observer.observe(document.body, {
	childList: true,
	subtree: true,
});
