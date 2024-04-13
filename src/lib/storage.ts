import type { Timestamp } from "../contentScript/lib/types";

export function saveData(videoId: string, timestamps: Timestamp[]) {
  const data = { [videoId]: timestamps };
  chrome.storage.local.set(data, () => {
    console.log('success');
  });
}

export function loadData(videoId: string): Promise<Timestamp[]> {
  return new Promise(resolve => {
    chrome.storage.local.get(videoId, (result) => {
      console.log('debug:result', result);
      if (result[videoId]) {
        resolve(result[videoId])
        return;
      }
      resolve([]);
    })
  })
}
