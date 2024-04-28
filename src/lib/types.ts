export interface Timestamp {
  id: string;
  time: string;
  text: string;
};

export interface SkipSeconds {
  longBackward: number;
  shortBackward: number;
  shortFoward: number;
  longFoward: number;
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
  shortFoward: Shortcut;
  longFoward: Shortcut;
}
