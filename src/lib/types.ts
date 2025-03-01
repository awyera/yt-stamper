export type Video = {
  id: string;
  title: string;
  author: string;
  channelId: string;
  lengthSeconds: string;
  publishedAt: string;
}

export type Timestamp = {
  id: string;
  time: string;
  text: string;
  video?: Video;
};

export type SkipSeconds = {
  longBackward: number;
  shortBackward: number;
  shortForward: number;
  longForward: number;
};

export type Shortcut = {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
};

export type Shortcuts = {
  toggleOpen: Shortcut;
  addTimestamp: Shortcut;
  copyClipboard: Shortcut;
  longBackward: Shortcut;
  shortBackward: Shortcut;
  shortForward: Shortcut;
  longForward: Shortcut;
};
