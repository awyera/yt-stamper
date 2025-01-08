export function assertVideo(video: unknown): asserts video is HTMLVideoElement {
  if (!(video instanceof HTMLVideoElement)) {
    throw new Error('video must be an HTMLVideoElement');
  }
}
