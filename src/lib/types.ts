export interface Timestamp {
  id: string;
  time: string;
  text: string;
}

export interface SkipSeconds {
  longBackward: number;
  shortBackward: number;
  shortForward: number;
  longForward: number;
}

export interface Shortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
}

export interface Shortcuts {
  toggleOpen: Shortcut;
  addTimestamp: Shortcut;
  copyClipboard: Shortcut;
  longBackward: Shortcut;
  shortBackward: Shortcut;
  shortForward: Shortcut;
  longForward: Shortcut;
}
