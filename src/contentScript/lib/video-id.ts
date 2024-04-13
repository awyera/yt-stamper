export function getVideoId(): string {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("v") ?? "";
}
