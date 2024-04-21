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
          className="w-20 px-1 py-1 text-base leading-normal"
          type="text"
          value={time}
          onKeyDown={(e) => e.stopPropagation()}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="00:00:00"
        />

        <div className="flex flex-col">
          <button
            className="h-2/4 border border-white border-solid p-0 px-1 text-white active:bg-gray-700 hover:bg-gray-600"
            type="button"
            tabIndex={-1}
            onClick={() => handleAdjustTime(1)}
          >
            <ChevronUp className="text-xs" size="1em" />
          </button>
          <button
            className="h-2/4 border border-white border-solid p-0 px-1 text-white active:bg-gray-700 hover:bg-gray-600"
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
