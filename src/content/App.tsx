import { useEffect, useState } from 'react';
import { TrieProvider } from '../context/TrieContext';
import { loadTimestamps, saveVideoTimestamps } from '../lib/storage';
import type { Timestamp } from '../lib/types';
import { YTStamper } from './components/YTStamper';
import { useVideoDetails } from './hooks/useVideoDetails';

export function App() {
  const video = useVideoDetails();
  const [timestamps, setTimestamps] = useState<Timestamp[]>([]);

  // timestamps が変更されたときに拡張機能ストレージに保存する
  function handleChange(timestamps: Timestamp[]) {
    setTimestamps(timestamps);
    saveVideoTimestamps(video.videoId, timestamps, video);
  }

  // 動画が変更されたとき拡張機能ストレージから timestamps を読み込む
  useEffect((): void => {
    loadTimestamps(video.videoId).then((data): void => {
      setTimestamps(data);
    });
  }, [video.videoId]);

  return (
    <TrieProvider>
      <YTStamper timestamps={timestamps} onChange={handleChange} />
    </TrieProvider>
  );
}
