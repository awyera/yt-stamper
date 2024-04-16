import { useEffect, useState } from "react";
import { useVideoId } from "./hooks/useVideoId";
import type { Timestamp } from "../lib/types";
import { loadData, saveData } from "../lib/storage";
import { YTStamper } from "./components/YTStamper";

export function App() {
  const videoId = useVideoId();

  const [timestamps, setTimestamps] = useState<Timestamp[]>([]);

  /**
   * timestamps が変更されたときに拡張機能ストレージに保存する
   * @param timestamps
   */
  function handleChange(timestamps: Timestamp[]) {
    setTimestamps(timestamps);
    saveData(videoId, timestamps);
  }

  /**
   * 動画が変更されたとき拡張機能ストレージから timestamps を読み込む
   */
  useEffect(() => {
    loadData(videoId).then((data) => {
      setTimestamps(data);
    });
  }, [videoId]);

  return <YTStamper timestamps={timestamps} onChange={handleChange} />;
}
