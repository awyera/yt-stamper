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

export function loadAllData(): Promise<Record<string, Timestamp[]>> {
  return new Promise((resolve) => {
    chrome.storage.local.get(null, (result) => {
      // skipSeconds と shortcuts は除外
      const { shortcuts: _shortcuts, skipSeconds: _skipSeconds, ...timestams } = result;

      resolve(timestams);
    });
  });
}

export function removeData(videoId: string): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.remove(videoId, resolve);
  });
}

// 保存されているタイムスタンプから text のトライ木を作成する
export async function loadTrieFromLocalStorage(): Promise<Trie> {
  const trie = new Trie();
  const data = await new Promise<Record<string, Timestamp[]>>((resolve) => {
    chrome.storage.local.get(null, resolve);
  });

  // shortcuts, skipSeconds は不要
  const { shortcuts: _shortcuts, skipSeconds: _skipSeconds, ...timestamps } = data;

  for (const id in timestamps) {
    for (const value of timestamps[id]) {
      trie.insert(value.text, id);
    }
  }

  return trie;
}
