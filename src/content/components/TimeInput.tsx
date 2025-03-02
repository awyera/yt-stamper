import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatTime, parseTime } from '../lib/time';
import { useState, useEffect } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import type { Timestamp } from '../../lib/types';

type Props = {
  time: Timestamp['time'];
  onChange: (time: string, isSeek?: boolean) => void;
};

export function TimeInput({ time, onChange }: Props) {
  const [history, setHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  function handleUndo() {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      onChange(history[currentIndex - 1]);
    }
  }

  function handleRedo() {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      onChange(history[currentIndex + 1]);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.ctrlKey && e.key === 'z') {
      handleUndo();
    }
    if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
      handleRedo();
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    onChange(value);
  }

  function handleBlur() {
    onChange(formatTime(parseTime(time)));
  }

  function handleAdjustTime(sec: number) {
    const seconds = parseTime(time) + sec;
    if (seconds < 0) {
      return;
    }

    onChange(formatTime(seconds), true);
  }

  useEffect(() => {
    setHistory((prevHistory) => [...prevHistory, time]);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }, [time]);

  return (
    <div className="inline-flex items-stretch justify-start overflow-clip rounded-sm border border-gray-500">
      <input
        className="w-20 px-1 py-1 text-base leading-normal bg-white"
        type="text"
        value={time}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="00:00:00"
      />

      <div className="flex flex-col">
        <button
          className="h-2/4 bg-gray-600 p-0 px-1 text-white active:bg-gray-900 hover:bg-gray-700"
          type="button"
          tabIndex={-1}
          onClick={() => handleAdjustTime(1)}
        >
          <ChevronUp className="text-xs" size="1em" />
        </button>

        <button
          className="h-2/4 border-t border-t-gray-500 bg-gray-600 p-0 px-1 text-white active:bg-gray-900 hover:bg-gray-700"
          type="button"
          tabIndex={-1}
          onClick={() => handleAdjustTime(-1)}
        >
          <ChevronDown className="text-xs" size="1em" />
        </button>
      </div>
    </div>
  );
}
