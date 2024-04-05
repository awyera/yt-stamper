import "@webcomponents/custom-elements";
import { createRoot } from "react-dom/client";
import { Stamper } from "./components/Stamper";

class YTStamperElement extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });

		// fetch(chrome.runtime.getURL("contentScript.css"))
		// 	.then((res) => res.text())
		// 	.then((css) => {
		// 		const style = document.createElement("style");
		// 		style.textContent = css;
		// 		shadowRoot.appendChild(style);
		// 	});

		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = chrome.runtime.getURL("contentScript.css");
		shadowRoot.append(link);
	}

	connectedCallback() {
		if (this.shadowRoot) {
			const root = createRoot(this.shadowRoot);
			root.render(<Stamper />);
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
