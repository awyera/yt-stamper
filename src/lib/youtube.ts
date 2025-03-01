import type { Video } from "./types";

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
    };
    microformat: {
      playerMicroformatRenderer: {
        liveBroadcastDetails: {
          startTimestamp: string;
          endTimestamp: string;
        };
        publishDate: string;
      }
    }
  }
}>

export const getVideoDetails = (e: YTEvent): Video => {
  const videoDetails = e.detail.response.playerResponse.videoDetails;
  const { liveBroadcastDetails, publishDate } = e.detail.response.microformat.playerMicroformatRenderer;
  return {
    id: videoDetails.videoId,
    title: videoDetails.title,
    author: videoDetails.author,
    channelId: videoDetails.channelId,
    lengthSeconds: videoDetails.lengthSeconds,
    publishedAt: liveBroadcastDetails ? liveBroadcastDetails.startTimestamp : publishDate
  }
};
