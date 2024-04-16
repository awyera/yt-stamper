import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ClipboardCopy, Plus } from "lucide-react";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import type { SkipSeconds } from "../../lib/types";
import { DEFAULT_SKIP_SECONDS } from "../../lib/const";
import { ButtonGroup } from "./ButtonGroup";

interface Props {
  skip: (time: number) => void;
  onClipboardCopy: () => void;
  onAddTimestamp: () => void;
}

export function Header({ skip, onClipboardCopy, onAddTimestamp }: Props) {
  const [skipSeconds, setSkipSeconds] = useState<SkipSeconds>(DEFAULT_SKIP_SECONDS);

  function skipBackwardLong() {
    skip(skipSeconds.longBackward * -1);
  }

  function skipBackwardShort() {
    skip(skipSeconds.shortBackward * -1);
  }

  function skipForwardShort() {
    skip(skipSeconds.shortFoward);
  }

  function skipForwardLong() {
    skip(skipSeconds.longFoward);
  }

  useEffect(() => {
    chrome.storage?.local.get("skipSeconds", (result) => {
      if (result.skipSeconds) {
        setSkipSeconds(result.skipSeconds);
      }
    });
  }, []);

  return (
    <header className="flex items-center gap-4 h-8 px-2 py-1 text-white bg-gray-500">
      <ButtonGroup>
        <Button onClick={skipBackwardLong}>
          <ChevronsLeft className="mt-[2px]" size="1em" />
          {skipSeconds.longBackward}s
        </Button>
        <Button onClick={skipBackwardShort}>
          <ChevronLeft className="mt-[2px]" size="1em" />
          {skipSeconds.shortBackward}s
        </Button>
        <Button onClick={skipForwardShort}>
          {skipSeconds.shortFoward}s
          <ChevronRight className="mt-[2px]" size="1em" />
        </Button>
        <Button onClick={skipForwardLong}>
          {skipSeconds.longFoward}s
          <ChevronsRight className="mt-[2px]" size="1em" />
        </Button>
      </ButtonGroup>

      <Button className="ml-auto" circle onClick={onClipboardCopy}>
        <ClipboardCopy size="1em" />
      </Button>

      <Button circle onClick={onAddTimestamp}>
        <Plus size="1em" />
      </Button>
    </header>
  );
}
