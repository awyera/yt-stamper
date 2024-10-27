import { useEffect, useState } from 'react';
import { DEFAULT_SHORTCUTS } from '../../lib/const';
import type { Shortcut, Shortcuts } from '../../lib/types';
import { useSkipSeconds } from './useSkipSeconds';

interface Props {
  toggleOpen: () => void;
  addTimestamp: () => void;
  copyToClipboard: () => void;
  skip: (time: number) => void;
}

// キーに一致するか
function isKeyMatch(shortcut: Shortcut, e: KeyboardEvent): boolean {
  return (
    shortcut.key.toLowerCase() === e.key.toLowerCase() &&
    !!shortcut.ctrl === e.ctrlKey &&
    !!shortcut.shift === e.shiftKey &&
    !!shortcut.alt === e.altKey
  );
}

export function useShortcuts({ toggleOpen, addTimestamp, copyToClipboard, skip }: Props) {
  const [shortcuts, setShortcuts] = useState<Shortcuts>(DEFAULT_SHORTCUTS);
  const { skipBackwardLong, skipBackwardShort, skipForwardLong, skipForwardShort } = useSkipSeconds(skip);

  // ショートカット
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (isKeyMatch(shortcuts.toggleOpen, e)) {
        toggleOpen();
        return;
      }
      if (isKeyMatch(shortcuts.addTimestamp, e)) {
        addTimestamp();
        return;
      }
      if (isKeyMatch(shortcuts.copyClipboard, e)) {
        copyToClipboard();
        return;
      }
      if (isKeyMatch(shortcuts.longBackward, e)) {
        skipBackwardLong();
        return;
      }
      if (isKeyMatch(shortcuts.shortBackward, e)) {
        skipBackwardShort();
        return;
      }
      if (isKeyMatch(shortcuts.longForward, e)) {
        skipForwardLong();
        return;
      }
      if (isKeyMatch(shortcuts.shortForward, e)) {
        skipForwardShort();
        return;
      }
    }

    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [
    shortcuts,
    toggleOpen,
    addTimestamp,
    copyToClipboard,
    skipBackwardLong,
    skipBackwardShort,
    skipForwardShort,
    skipForwardLong,
  ]);

  // 保存済みのショートカットを読み込む
  useEffect(() => {
    chrome.storage?.local.get('shortcuts').then((result) => {
      if (result.shortcuts) {
        setShortcuts(result.shortcuts);
      }
    });
  }, []);
}
