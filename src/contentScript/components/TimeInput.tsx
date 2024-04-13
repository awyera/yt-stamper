import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { formatTime, parseTime } from "../lib/time";
import type { Timestamp } from "../lib/types";

function isValidFormat(time: string) {
  return /^(\d{1,2}:)?(\d{1,2}:)?\d+$/.test(time);
}

type Props = {
  time: Timestamp["time"];
  onChange: (time: string) => void;
};

export function TimeInput({ time, onChange }: Props) {
  const [error, setError] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    if (isValidFormat(value)) {
      setError("");
    } else {
      setError("Invalid format");
    }
    onChange(value);
  }

  function handleBlur() {
    onChange(formatTime(parseTime(time)));
  }

  function handleAdjustTime(sec: number) {
    const seconds = parseTime(time) + sec;
    if (seconds < 0) {
      setError("Invalid time");
      return;
    }

    onChange(formatTime(seconds));
  }

  return (
    <div>
      <div className="flex items-stretch justify-start">
        <input
          className="text-base w-20 px-1 py-1 leading-none"
          type="text"
          value={time}
          onKeyDown={(e) => e.stopPropagation()}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="00:00:00"
        />

        <div className="flex flex-col">
          <button
            className="p-0 px-1 h-2/4 text-white border border-solid border-white hover:bg-gray-600 active:bg-gray-700"
            type="button"
            tabIndex={-1}
            onClick={() => handleAdjustTime(1)}
          >
            <ChevronUp className="text-xs" size="1em" />
          </button>
          <button
            className="p-0 px-1 h-2/4 text-white border border-solid border-white hover:bg-gray-600 active:bg-gray-700"
            type="button"
            tabIndex={-1}
            onClick={() => handleAdjustTime(-1)}
          >
            <ChevronDown className="text-xs" size="1em" />
          </button>
        </div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
