import { Play, Timer, Trash } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import type { Timestamp } from '../../lib/types';
import { formatTime, parseTime } from '../lib/time';
import { Autocomplete } from "./Autocomplete";
import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';
import { TimeInput } from './TimeInput';

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

  function handleTextChange(text: string) {
    onChange({ ...timestamp, text });
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
    <div className={twMerge('flex items-center gap-1', className)}>
      <TimeInput time={timestamp.time} onChange={handleTimeChange} />

      <Autocomplete className="w-20 grow" value={timestamp.text} onChange={handleTextChange} />

      <ButtonGroup>
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
