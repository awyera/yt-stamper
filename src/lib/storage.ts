import { Trie } from './trie';
import type { StorageData, Timestamp, VideoDetails, VideoTimestamps } from './types';

export async function saveVideoTimestamps(videoId: string, timestamps: Timestamp[], video: VideoDetails): Promise<void> {
  const data: StorageData['videoTimestamps'] = { [videoId]: { list: timestamps, videoDetails: video } };
  const currentData = await loadAllVideoTimestamps();
  return new Promise(resolve => {
    chrome.storage.local.set({ videoTimestamps: Object.assign(currentData, data) }, resolve);
  });
}

export function loadTimestamps(videoId: string): Promise<Timestamp[]> {
  return new Promise((resolve) => {
    chrome.storage.local.get(`videoTimestamps`, (result) => {
      console.log('debug:result', result);
      if (!result.videoTimestamps[videoId]) {
        resolve([]);
        return;
      }
      resolve(result.videoTimestamps[videoId].list);
    });
  });
}

export function loadVideoTimestamps(videoId: string): Promise<VideoTimestamps | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get(`videoTimestamps`, (result) => {
      if (!result.videoTimestamps[videoId]) {
        resolve(null);
        return;
      }
      resolve(result.videoTimestamps[videoId]);
    });
  });
}

export function loadAllVideoTimestamps(): Promise<StorageData['videoTimestamps']> {
  return new Promise((resolve) => {
    chrome.storage.local.get('videoTimestamps', (result) => {
      if (!result.videoTimestamps) {
        resolve({});
        return;
      }
      resolve(result.videoTimestamps);
    });
  });
}

export async function removeData(videoId: string): Promise<void> {
  const currentData = await loadAllVideoTimestamps();
  const newData = { ...currentData };
  delete newData[videoId];
  return new Promise((resolve) => {
    chrome.storage.local.set({ videoTimestamps: newData }, resolve);
  });
}

// 保存されているタイムスタンプから text のトライ木を作成する
export async function loadTrieFromLocalStorage(): Promise<Trie> {
  const trie = new Trie();
  const videoTimestamps = await loadAllVideoTimestamps()

  for (const videoId in videoTimestamps) {
    for (const timestamp of videoTimestamps[videoId].list) {
      trie.insert(timestamp.text, videoId);
    }
  }

  return trie;
}
