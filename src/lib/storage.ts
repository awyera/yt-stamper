import { Trie } from './trie';
import type { Timestamp } from './types';

export function saveData(videoId: string, timestamps: Timestamp[]) {
  const data = { [videoId]: timestamps };
  chrome.storage.local.set(data);
}

export function loadData(videoId: string): Promise<Timestamp[]> {
  return new Promise((resolve) => {
    chrome.storage.local.get(videoId, (result) => {
      if (result[videoId]) {
        resolve(result[videoId]);
        return;
      }
      resolve([]);
    });
  });
}

// 保存されているタイムスタンプから text のトライ木を作成する
export async function loadTrieFromLocalStorage(): Promise<Trie> {
  const trie = new Trie();
  const data = await new Promise<{ [key: string]: Timestamp[] }>((resolve) => {
    chrome.storage.local.get(null, resolve);
  });

  // shortcuts, skipSeconds は不要
  const { shortcuts, skipSeconds, ...timestamps } = data;

  for (const values of Object.values(timestamps)) {
    for (const value of values) {
      trie.insert(value.text);
    }
  }

  return trie;
};
