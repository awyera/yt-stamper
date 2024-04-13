import { useEffect, useState } from "react";
import { useVideoId } from "./hooks/useVideoId";
import type { Timestamp } from "./lib/types";
import { loadData, saveData } from "../lib/storage";
import { YTStamper } from "./components/YTStamper";

export function App() {
  const videoId = useVideoId();

  const [timestamps, setTimestamps] = useState<Timestamp[]>([]);

  function handleChange(timestamps: Timestamp[]) {
    setTimestamps(timestamps);
    saveData(videoId, timestamps);
  }

  useEffect(() => {
    loadData(videoId).then((data) => {
      setTimestamps(data);
    });
  }, [videoId]);

  return <YTStamper timestamps={timestamps} onChange={handleChange} />;
}
