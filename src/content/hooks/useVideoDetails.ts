import type { VideoDetails } from "../../lib/types";

export const useVideoDetails = (): VideoDetails => {
  return (window as any).__YT_STAMPER_DATA__?.videoDetails;
};
