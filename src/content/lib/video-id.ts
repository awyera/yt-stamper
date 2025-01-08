export const extractVideoID = (url: string = window.location.href): string => {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname;

    // /watch?v=xxx
    if (path === '/watch') {
      const videoID = urlObj.searchParams.get('v');
      return videoID || '';
    }

    // /live/xxx
    if (path.startsWith('/live/')) {
      const videoID = path.split('/')[2];
      return videoID || '';
    }

    return '';
  } catch (e) {
    console.error('Invalid URL:', e);
    return '';
  }
}
