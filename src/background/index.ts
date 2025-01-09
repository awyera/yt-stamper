chrome.webNavigation.onHistoryStateUpdated.addListener(
  (details) => {
    chrome.tabs.sendMessage(details.tabId, { url: details.url });
  },
  { url: [{ hostSuffix: 'youtube.com', pathPrefix: '/watch' }, { hostSuffix: 'youtube.com', pathPrefix: '/live' }] },
);
