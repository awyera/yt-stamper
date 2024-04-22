import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { formatTime, parseTime } from "../lib/time";
import type { Timestamp } from "../../lib/types";

function isValidFormat(time: string) {
  return /^(\d{1,2}:)?(\d{1,2}:)?\d+$/.test(time);
}

interface Props {
  time: Timestamp["time"];
  onChange: (time: string) => void;
}

export function TimeInput({ time, onChange }: Props) {
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

    onChange(formatTime(seconds));
  }

  return (
    <div className="flex items-stretch justify-start">
      <input
        className="w-20 border border-gray-500 px-1 py-1 text-base leading-normal"
        type="text"
        value={time}
        onKeyDown={(e) => e.stopPropagation()}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="00:00:00"
      />

      <div className="flex flex-col">
        <button
          className="h-2/4 border border-gray-500 border-b-0 border-l-0 bg-gray-600 p-0 px-1 text-white active:bg-gray-900 hover:bg-gray-700"
          type="button"
          tabIndex={-1}
          onClick={() => handleAdjustTime(1)}
        >
          <ChevronUp className="text-xs" size="1em" />
        </button>
        <button
          className="h-2/4 border border-gray-500 border-t-gray-500 border-l-0 bg-gray-600 p-0 px-1 text-white active:bg-gray-900 hover:bg-gray-700"
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
