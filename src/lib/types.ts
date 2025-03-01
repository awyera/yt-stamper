export type VideoDetails = {
  videoId: string;
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
};

export type VideoTimpstamps = {
  list: Timestamp[]
  videoDetails: VideoDetails
}

export type StorageData = {
  skipSeconds: SkipSeconds;
  videoTimestmaps: {
    [videoId: string]: VideoTimpstamps
  };
}

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
