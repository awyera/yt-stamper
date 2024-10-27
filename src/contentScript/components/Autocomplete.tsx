import { type ComponentProps, type KeyboardEvent, type MouseEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTrie } from '../../context/TrieContext';
import { Input } from './Input';

interface Props {
  className?: string;
  value: string;
  inputProps?: ComponentProps<typeof Input>;
  onChange: (value: string) => void;
}

export function Autocomplete({ className, value, inputProps, onChange }: Props) {
  const trie = useTrie();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  function handleChange(value: string) {
    onChange(value);

    if (trie && value) {
      setSuggestions(trie.search(value));
    } else {
      setSuggestions([]);
    }
  }

  function handleKeydown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setCurrentIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setCurrentIndex((i) => (i > 0 ? i - 1 : suggestions.length - 1));
    }
    if (event.key === 'Enter') {
      if (currentIndex >= 0 && currentIndex < suggestions.length) {
        onChange(suggestions[currentIndex]);
        setSuggestions([]);
        setCurrentIndex(-1);
      }
    }
    if (event.key === 'Escape') {
      setSuggestions([]);
      setCurrentIndex(-1);
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
    <div className={twMerge('relative w-full', className)}>
      <Input {...inputProps} value={value} onChange={handleChange} onKeyDown={handleKeydown} />
      {suggestions ? (
        <ul className="absolute right-0 left-0 z-10 bg-white shadow-md">
          {suggestions.map((suggestion, i) => (
            <li
              className={twMerge('cursor-pointer hover:bg-gray-300', currentIndex === i && 'bg-gray-400')}
              key={suggestion}
            >
              <button className="w-full text-left" title={suggestion} type="button" onClick={handleSelect}>
                <span className="line-clamp-2 text-base leading-normal">{suggestion}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
