import { useEffect, useState } from 'react';
import { extractVideoID } from '../lib/video-id';

export function useVideoId() {
  const [videoId, setVideoId] = useState<string>(extractVideoID());

  useEffect(() => {
    // URLが変更されたときに動画IDを更新する
    const handleHistoryChange = (message: { url: string }) => {
      if (message.url) {
        const newVideoId = extractVideoID(message.url);
        setVideoId(newVideoId);
      }
    };

    chrome.runtime.onMessage.addListener(handleHistoryChange);

    return () => {
      chrome.runtime.onMessage.removeListener(handleHistoryChange);
    };
  }, []);

  return videoId;
}
