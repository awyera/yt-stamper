import { type ComponentProps, type KeyboardEvent, type MouseEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { useTrie } from '../../context/TrieContext';
import { Input } from './Input';

type Props = {
  className?: string;
  value: string;
  inputProps?: ComponentProps<typeof Input>;
  onChange: (value: string) => void;
};

export function Autocomplete({ className, value, inputProps, onChange }: Props) {
  const trie = useTrie();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const thisRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  function handleChange(value: string) {
    onChange(value);

    if (trie && value) {
      setSuggestions(trie.search(value).words);
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
    if (event.key === 'Enter' && currentIndex >= 0 && currentIndex < suggestions.length) {
      onChange(suggestions[currentIndex]);
      setSuggestions([]);
      setCurrentIndex(-1);
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

  const root = thisRef.current?.getRootNode() as ShadowRoot | null;
  useEffect(() => {
    console.log('debug:root', root);
    console.log('debug:root instanceof ShadowRoot', root instanceof ShadowRoot);
    console.log('debug:suggestionsRef.current', suggestionsRef.current);

    if (!root || !(root instanceof ShadowRoot) || !suggestionsRef.current) return;

    const rootHeight = root.host.getBoundingClientRect().height;
    console.log('debug:root.host', root.host);

    const offsetX = thisRef.current?.offsetLeft ?? 0;
    const offsetY = thisRef.current?.offsetTop ?? 0;
    const width = thisRef.current?.offsetWidth ?? 0;

    console.log('debug:rootHeight', rootHeight);
    console.log('debug:offsetX', offsetX);
    console.log('debug:offsetY', offsetY);
    console.log('debug:width', width);

    suggestionsRef.current.style.top = `${-rootHeight + offsetY + 8}px`;
    suggestionsRef.current.style.left = `${offsetX}px`;
    suggestionsRef.current.style.width = `${width}px`;
  }, [root, suggestions.length]);

  return (
    <div className={twMerge('w-full', className)} ref={thisRef}>
      <Input {...inputProps} value={value} onChange={handleChange} onKeyDown={handleKeydown} />
      {suggestions.length && root
        ? createPortal(
            <ul className="relative z-999 bg-white shadow-md" ref={suggestionsRef}>
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
            </ul>,
            root,
          )
        : null}
    </div>
  );
}
