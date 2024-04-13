import { Play, Timer, Trash } from "lucide-react";
import { Button } from "./Button";
import { TimeInput } from "./TimeInput";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { Timestamp } from "../lib/types";
import { formatTime } from "../lib/time";
import clsx from "clsx";
import { ButtonGroup } from "./ButtonGroup";

type Props = {
  className?: string;
  video: HTMLVideoElement;
  timestamp: Timestamp;
  onPlay: (timestamp: Timestamp) => void;
  onTimestampChange: (timestamp: Timestamp) => void;
  onDelete: (timestamp: Timestamp) => void;
};

export function Stamp({ className, video, timestamp, onTimestampChange, onPlay, onDelete }: Props) {
  function handleTimeChange(time: string) {
    onTimestampChange({
      ...timestamp,
      time,
    });
  }

  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    onTimestampChange({
      ...timestamp,
      text: value,
    });
  }

  function handlePlay() {
    onPlay(timestamp);
  }

  function handleTimestamp() {
    onTimestampChange({
      ...timestamp,
      time: formatTime(video.currentTime),
    });
  }

  function handleDelete() {
    onDelete(timestamp);
  }

  return (
    <div className={clsx(className, "flex items-start gap-4")}>
      <TimeInput time={timestamp.time} onChange={handleTimeChange} />

      <input
        className="grow text-base w-20 px-1 py-1 leading-none"
        type="text"
        value={timestamp.text}
        onChange={handleTextChange}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.stopPropagation()}
      />

      <ButtonGroup className="self-center">
        <Button className="text-base" disabled={!timestamp.time} onClick={handlePlay}>
          <Play size="1em" />
        </Button>

        <Button className="text-base" onClick={handleTimestamp}>
          <Timer size="1em" />
        </Button>

        <Button className="text-base" onClick={handleDelete}>
          <Trash size="1em" />
        </Button>
      </ButtonGroup>
    </div>
  );
}
