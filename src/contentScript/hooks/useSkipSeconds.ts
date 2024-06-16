import { useEffect, useState } from 'react';
import { DEFAULT_SKIP_SECONDS } from '../../lib/const';
import type { SkipSeconds } from '../../lib/types';

export function useSkipSeconds(skip: (seconds: number) => void) {
  const [skipSeconds, setSkipSeconds] = useState<SkipSeconds>(DEFAULT_SKIP_SECONDS);

  function skipBackwardLong() {
    skip(skipSeconds.longBackward * -1);
  }

  function skipBackwardShort() {
    skip(skipSeconds.shortBackward * -1);
  }

  function skipForwardShort() {
    skip(skipSeconds.shortForward);
  }

  function skipForwardLong() {
    skip(skipSeconds.longForward);
  }

  useEffect(() => {
    chrome.storage?.local.get('skipSeconds', (result) => {
      if (result.skipSeconds) {
        setSkipSeconds(result.skipSeconds);
      }
    });
  }, []);

  return {
    skipSeconds,
    skipBackwardLong,
    skipBackwardShort,
    skipForwardShort,
    skipForwardLong,
  };
}
