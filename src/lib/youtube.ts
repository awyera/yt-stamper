import type { VideoDetails } from "./types";

export type YTEvent = CustomEvent<{
  response: {
    playerResponse: {
      videoDetails: {
        videoId: string;
        title: string;
        author: string;
        channelId: string;
        lengthSeconds: string;
      }
      microformat: {
        playerMicroformatRenderer: {
          liveBroadcastDetails: {
            startTimestamp: string;
            endTimestamp: string;
          };
          publishDate: string;
        }
      }
    };
  }
}>

export const getVideoDetails = (e: YTEvent): VideoDetails => {
  const { videoId, title, author, channelId, lengthSeconds } = e.detail.response.playerResponse.videoDetails;
  const { liveBroadcastDetails, publishDate } = e.detail.response.playerResponse.microformat.playerMicroformatRenderer;
  return {
    videoId,
    title,
    author,
    channelId,
    lengthSeconds,
    publishedAt: liveBroadcastDetails ? liveBroadcastDetails.startTimestamp : publishDate
  }
};
