import type { Timestamp } from "./types";

export function saveData(videoId: string, timestamps: Timestamp[]) {
  const data = { [videoId]: timestamps };
  chrome.storage.local.set(data);
}

export function loadData(videoId: string): Promise<Timestamp[]> {
  return new Promise(resolve => {
    chrome.storage.local.get(videoId, (result) => {
      if (result[videoId]) {
        resolve(result[videoId])
        return;
      }
      resolve([]);
    })
  })
}
