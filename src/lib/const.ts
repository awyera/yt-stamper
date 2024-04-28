import type { Shortcuts, SkipSeconds } from "./types";

export const DEFAULT_SKIP_SECONDS: SkipSeconds = {
  longBackward: 60,
  shortBackward: 30,
  shortFoward: 30,
  longFoward: 60,
};

export const DEFAULT_SHORTCUTS: Shortcuts = {
  addTimestamp: { alt: true, shift: true, key: 'a' },
  copyClipboard: { alt: true, shift: true, key: 'c' },
  toggleOpen: { alt: true, shift: true, key: 'o' },
  longBackward: { alt: true, shift: true, key: 'h' },
  shortBackward: { alt: true, key: 'h' },
  shortFoward: { alt: true, key: 'l' },
  longFoward: { alt: true, shift: true, key: 'l' },
}
