import { Play, Timer, Trash } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../../components/Button';
import type { Timestamp } from '../../lib/types';
import { formatTime, parseTime } from '../lib/time';
import { Autocomplete } from './Autocomplete';
import { ButtonGroup } from './ButtonGroup';
import { TimeInput } from './TimeInput';

type Props = {
  className?: string;
  video: HTMLVideoElement;
  timestamp: Timestamp;
  isDeleteMode: boolean;
  seek: (seconds: number) => void;
  onChange: (timestamp: Timestamp) => void;
  onDelete: (timestamp: Timestamp) => void;
};

export function Stamp({ className, video, timestamp, isDeleteMode, seek, onChange, onDelete }: Props) {
  const [history, setHistory] = useState<string[]>([timestamp.time]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function undoTime() {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      onChange({ ...timestamp, time: history[currentIndex - 1] });
    }
  }

  function redoTime() {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      onChange({ ...timestamp, time: history[currentIndex + 1] });
    }
  }

  function handleTimeChange(time: string, isSeek = false) {
    if (timestamp.time === time) {
      return;
    }

    if (isSeek) {
      // 時刻が変更されていたときのみ動画を移動
      video.currentTime = parseTime(time);
    }

    setHistory((prevHistory) => [...prevHistory.slice(0, currentIndex + 1), time]);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    onChange({ ...timestamp, time });
  }

  function handleTextChange(text: string) {
    onChange({ ...timestamp, text });
  }

  function handlePlay() {
    seek(parseTime(timestamp.time));
  }

  function handleTimestamp() {
    const time = formatTime(video.currentTime);
    if (timestamp.time === time) {
      return;
    }

    setHistory((prevHistory) => [...prevHistory.slice(0, currentIndex + 1), time]);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    onChange({ ...timestamp, time });
  }

  function handleDelete() {
    onDelete(timestamp);
  }

  return (
    <div className={twMerge('flex items-center gap-1', className)}>
      <TimeInput time={timestamp.time} undo={undoTime} redo={redoTime} onChange={handleTimeChange} />

      <Autocomplete className="grow" value={timestamp.text} onChange={handleTextChange} />

      {isDeleteMode ? (
        <Button className="text-base" variant="danger" title="削除" tabIndex={-1} onClick={handleDelete}>
          <Trash size="1em" />
        </Button>
      ) : (
        <ButtonGroup>
          <Button className="text-base" title="再生" tabIndex={-1} disabled={!timestamp.time} onClick={handlePlay}>
            <Play size="1em" />
          </Button>

          <Button className="text-base" title="現在の再生時間を記録" tabIndex={-1} onClick={handleTimestamp}>
            <Timer size="1em" />
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
}
