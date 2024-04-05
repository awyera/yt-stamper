chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  chrome.scripting.executeScript({
    target: { tabId: details.tabId },
    files: ["contentScript.js"]
  });
}, { url: [{ hostSuffix: 'youtube.com', pathPrefix: '/watch' }] });
