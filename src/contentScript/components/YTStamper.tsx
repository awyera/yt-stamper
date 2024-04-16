import { nanoid } from "nanoid";
import { useEffect, useMemo, useState } from "react";
import type { Timestamp } from "../../lib/types";
import { Header } from "./Header";
import { Stamp } from "./Stamp";

interface Props {
  timestamps: Timestamp[];
  onChange: (timestamps: Timestamp[]) => void;
}

export function YTStamper({ timestamps, onChange }: Props) {
  const [height, setHeight] = useState("");
  const video = useMemo(() => document.querySelector("video") as HTMLVideoElement, []);

  /**
   * 指定秒分再生時間をスキップ
   */
  function skip(seconds: number) {
    video.currentTime += seconds;
    video.play();
  }

  /**
   * 再生時間を指定秒に変更
   */
  function seek(seconds: number) {
    video.currentTime = seconds;
    video.play();
  }

  /**
   * クリップボードにコピー
   */
  function copyToClipboard() {
    const text = timestamps
      .filter((t) => t.time)
      .map((t) => `${t.time} ${t.text}`)
      .join("\n");
    navigator.clipboard.writeText(text);
  }

  /**
   * timestamp を追加
   */
  function addTimestamp() {
    onChange([...timestamps, { id: nanoid(), time: "", text: "" }]);
  }

  /**
   * timestamp を変更
   */
  function changeTimestamp(timestamp: Timestamp) {
    onChange(timestamps.map((t) => (t.id === timestamp.id ? timestamp : t)));
  }

  /**
   * timestamp を削除
   */
  function removeTimestamp(timestamp: Timestamp) {
    onChange(timestamps.filter((t) => t.id !== timestamp.id));
  }

  /**
   * video の高さを更新
   */
  useEffect(() => {
    const videoElm = document.querySelector("video");
    if (!videoElm) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setHeight(`${entry.contentRect.height}px`);
    });

    resizeObserver.observe(videoElm);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col border border-solid border-gray-500" style={{ maxHeight: height }}>
      <Header skip={skip} onClipboardCopy={copyToClipboard} onAddTimestamp={addTimestamp} />

      <div className="grow overflow-y-auto">
        {timestamps.length ? (
          <div className="overflow-auto">
            {timestamps.map((timestamp) => (
              <Stamp
                className="first:mt-0 my-2 pt-2 px-2 border-t first:border-t-0 border-t-gray-500 border-solid"
                key={timestamp.id}
                video={video}
                timestamp={timestamp}
                onChange={changeTimestamp}
                seek={seek}
                onDelete={removeTimestamp}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
