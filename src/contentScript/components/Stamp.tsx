import { Play, Timer, Trash } from "lucide-react";
import { Button } from "./Button";
import { TimeInput } from "./TimeInput";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { Timestamp } from "../../lib/types";
import { formatTime, parseTime } from "../lib/time";
import clsx from "clsx";
import { ButtonGroup } from "./ButtonGroup";

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
    <div className={clsx(className, "flex items-start gap-4")}>
      <TimeInput time={timestamp.time} onChange={handleTimeChange} />

      <input
        className="grow text-base w-20 px-1 py-1 leading-normal"
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

        <Button className="text-base" title="削除" tabIndex={-1} onClick={handleDelete}>
          <Trash size="1em" />
        </Button>
      </ButtonGroup>
    </div>
  );
}
