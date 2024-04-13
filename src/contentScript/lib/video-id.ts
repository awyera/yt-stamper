export function getVideoId(url: string = window.location.href): string {
  const search = new URL(url).search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get("v") ?? "";
}
