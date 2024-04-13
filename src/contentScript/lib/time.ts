export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${hours > 0 ? `${hours}:` : ""}${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function parseTime(time: string) {
  const parts = time.split(":").map(Number);
  const seconds = (parts.pop() || 0) + (parts.pop() || 0) * 60 + (parts.pop() || 0) * 3600;

  return seconds;
}
