import { useState } from "react";

export function Stamper() {
  const [stamps, setStamps] = useState<number[]>([]);

  function onStampClick() {
    const video = document.querySelector("video");
    const currentTime = video?.currentTime ?? 0;

    setStamps([currentTime]);
  }

  function parseDuration(duration: number) {
    if (!duration) return '';

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - hours * 3600) / 60);
    const seconds = Math.floor(duration - hours * 3600 - minutes * 60);

    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <div>
      <div className="border border-solid border-white text-white">
        <div>
          <input className="text-black" type="text" placeholder="00:00" value={parseDuration(stamps[0])} onChange={() => {}} />
          <input type="text" placeholder="text" />
          <button type="button" onClick={onStampClick}>
            stamp
          </button>
        </div>
      </div>
    </div>
  )
}
