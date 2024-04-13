import { useMemo, useState } from "react";
import { Header } from "./Header";
import { Stamp } from "./Stamp";
import { parseTime } from "../lib/time";
import type { Timestamp } from "../lib/types";
import { nanoid } from "nanoid";

export function YTStamper() {
  const [timestamps, setTimestamps] = useState<Timestamp[]>([]);

  const video = useMemo(() => document.querySelector("video") as HTMLVideoElement, []);

  function handleAddStamp() {
    setTimestamps((timestamps) => [
      ...timestamps,
      {
        id: nanoid(),
        time: "",
        text: "",
      },
    ]);
  }

  function handleTimeChange(seconds: number) {
    video.currentTime += seconds;
    video.play();
  }

  function handleClipboardCopy() {
    const text = timestamps
      .filter((t) => t.time)
      .map((t) => `${t.time} ${t.text}`)
      .join("\n");
    navigator.clipboard.writeText(text);
  }

  function handleTimestampChange(timestamp: Timestamp) {
    setTimestamps((timestamps) => {
      return timestamps.map((t) => (t.id === timestamp.id ? timestamp : t));
    });
  }

  function handlePlay(timestamp: Timestamp) {
    const seconds = parseTime(timestamp.time);
    video.currentTime = seconds;
    video.play();
  }

  function handleDelete(timestamp: Timestamp) {
    setTimestamps((timestamps) => {
      return timestamps.filter((t) => t.id !== timestamp.id);
    });
  }

  return (
    <div>
      <Header onTimeChange={handleTimeChange} onClipboardCopy={handleClipboardCopy} onAddStamp={handleAddStamp} />

      {timestamps.length ? (
        <div className="border border-solid border-gray-500 border-t-0 overflow-auto">
          {timestamps.map((timestamp, index) => (
            <Stamp
              className="first:mt-0 my-2 pt-2 px-2 border-t border-t-gray-500 border-solid"
              key={timestamp.id}
              video={video}
              timestamp={timestamp}
              onTimestampChange={handleTimestampChange}
              onPlay={handlePlay}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
