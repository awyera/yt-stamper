import { loadData, saveData } from '../lib/storage';
import { useEffect, useState } from 'react';
import type { Timestamp } from '../lib/types';
import { TrieProvider } from '../context/TrieContext';
import { YTStamper } from './components/YTStamper';
import { useVideoId } from './hooks/useVideoId';

export function App() {
  const videoId = useVideoId();

  const [timestamps, setTimestamps] = useState<Timestamp[]>([]);

  // timestamps が変更されたときに拡張機能ストレージに保存する
  function handleChange(timestamps: Timestamp[]) {
    setTimestamps(timestamps);
    saveData(videoId, timestamps);
  }

  // 動画が変更されたとき拡張機能ストレージから timestamps を読み込む
  useEffect((): void => {
    loadData(videoId).then((data): void => {
      setTimestamps(data);
    });
  }, [videoId]);

  return (
    <TrieProvider>
      <YTStamper timestamps={timestamps} onChange={handleChange} />
    </TrieProvider>
  );
}
