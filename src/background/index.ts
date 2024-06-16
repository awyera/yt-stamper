chrome.webNavigation.onHistoryStateUpdated.addListener(
  (details) => {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ['contentScript.js'],
    });

    chrome.tabs.sendMessage(details.tabId, { url: details.url });
  },
  { url: [{ hostSuffix: 'youtube.com', pathPrefix: '/watch' }] },
);
