import { type ComponentProps, type MouseEvent, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useTrie } from "../../context/TrieContext";
import { Input } from "./Input";

interface Props {
  className?: string;
  value: string;
  inputProps?: ComponentProps<typeof Input>;
  onChange: (value: string) => void;
}

export function Autocomplete({ className, value, inputProps, onChange }: Props) {
  const trie = useTrie();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  function handleChange(value: string) {
    onChange(value);

    if (trie && value) {
      setSuggestions(trie.search(value));
    } else {
      setSuggestions([]);
    }
  }

  function handleSelect(e: MouseEvent<HTMLButtonElement>) {
    const value = e.currentTarget.textContent;
    if (value) {
      onChange(value);
      setSuggestions([]);
    }
  }

  return (
    <div className={twMerge("relative w-full", className)}>
      <Input {...inputProps} value={value} onChange={handleChange} />
      {suggestions ? (
        <ul className="absolute right-0 left-0 z-10 bg-white">
          {suggestions.map((suggestion) => (
            <li className="cursor-pointer hover:bg-gray-300" key={suggestion}>
              <button className="text-left" title={suggestion} type="button" onClick={handleSelect}>
                <span className="line-clamp-2 text-base leading-normal">{suggestion}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
