import { Trie } from './trie';
import type { StorageData, Timestamp, VideoDetails, VideoTimpstamps } from './types';

export async function saveVideoTimpstamps(videoId: string, timestamps: Timestamp[], video: VideoDetails): Promise<void> {
  const data: StorageData['videoTimestmaps'] = { [videoId]: { list: timestamps, videoDetails: video } };
  const currentData = await loadAllVideoTimpstamps();
  return new Promise(resolve => {
    chrome.storage.local.set({ videoTimestamps: Object.assign(currentData, data) }, resolve);
  });
}

export function loadTimestamps(videoId: string): Promise<Timestamp[]> {
  return new Promise((resolve) => {
    chrome.storage.local.get(`videoTimestmaps`, (result) => {
      if (!result.videoTimestamps[videoId]) {
        resolve([]);
        return;
      }
      resolve(result.videoTimestamps[videoId].list);
    });
  });
}

export function loadVideoTimestamps(videoId: string): Promise<VideoTimpstamps | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get(`videoTimestmaps`, (result) => {
      if (!result.videoTimestamps[videoId]) {
        resolve(null);
        return;
      }
      resolve(result.videoTimestamps[videoId]);
    });
  });
}

export function loadAllVideoTimpstamps(): Promise<StorageData['videoTimestmaps']> {
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
  const currentData = await loadAllVideoTimpstamps();
  const newData = { ...currentData };
  delete newData[videoId];
  return new Promise((resolve) => {
    chrome.storage.local.set({ videoTimestamps: newData }, resolve);
  });
}

// 保存されているタイムスタンプから text のトライ木を作成する
export async function loadTrieFromLocalStorage(): Promise<Trie> {
  const trie = new Trie();
  const videoTimpstamps = await loadAllVideoTimpstamps()

  for (const videoId in videoTimpstamps) {
    for (const timestmap of videoTimpstamps[videoId].list) {
      trie.insert(timestmap.text, videoId);
    }
  }

  return trie;
}
