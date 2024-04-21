import { Play, Timer, Trash } from "lucide-react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { twMerge } from "tailwind-merge";
import type { Timestamp } from "../../lib/types";
import { formatTime, parseTime } from "../lib/time";
import { Button } from "./Button";
import { ButtonGroup } from "./ButtonGroup";
import { TimeInput } from "./TimeInput";

interface Props {
  className?: string;
  video: HTMLVideoElement;
  timestamp: Timestamp;
  seek: (seconds: number) => void;
  onChange: (timestamp: Timestamp) => void;
  onDelete: (timestamp: Timestamp) => void;
}

export function Stamp({ className, video, timestamp, seek, onChange, onDelete }: Props) {
  function handleTimeChange(time: string) {
    onChange({ ...timestamp, time });
  }

  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    onChange({ ...timestamp, text: value });
  }

  function handlePlay() {
    seek(parseTime(timestamp.time));
  }

  function handleTimestamp() {
    onChange({ ...timestamp, time: formatTime(video.currentTime) });
  }

  function handleDelete() {
    onDelete(timestamp);
  }

  return (
    <div className={twMerge("flex items-start gap-4", className)}>
      <TimeInput time={timestamp.time} onChange={handleTimeChange} />

      <input
        className="w-20 grow px-1 py-1 text-base leading-normal"
        type="text"
        value={timestamp.text}
        onChange={handleTextChange}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.stopPropagation()}
      />

      <ButtonGroup className="self-center">
        <Button className="text-base" title="再生" tabIndex={-1} disabled={!timestamp.time} onClick={handlePlay}>
          <Play size="1em" />
        </Button>

        <Button className="text-base" title="現在の再生時間を記録" tabIndex={-1} onClick={handleTimestamp}>
          <Timer size="1em" />
        </Button>

        <Button className="text-base" variant="danger" title="削除" tabIndex={-1} onClick={handleDelete}>
          <Trash size="1em" />
        </Button>
      </ButtonGroup>
    </div>
  );
}
