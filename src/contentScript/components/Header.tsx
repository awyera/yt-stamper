import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
  ClipboardCopy,
  Plus
} from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { DEFAULT_SKIP_SECONDS } from "../../lib/const";
import type { SkipSeconds } from "../../lib/types";
import { Button } from "./Button";
import { ButtonGroup } from "./ButtonGroup";

interface Props {
  isOpen: boolean;
  skip: (time: number) => void;
  onClipboardCopy: () => void;
  onAddTimestamp: () => void;
  onClick: () => void;
}

export function Header({ isOpen, skip, onClipboardCopy, onAddTimestamp, onClick }: Props) {
  const [skipSeconds, setSkipSeconds] = useState<SkipSeconds>(DEFAULT_SKIP_SECONDS);

  function skipBackwardLong(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    skip(skipSeconds.longBackward * -1);
  }

  function skipBackwardShort(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    skip(skipSeconds.shortBackward * -1);
  }

  function skipForwardShort(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    skip(skipSeconds.shortFoward);
  }

  function skipForwardLong(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    skip(skipSeconds.longFoward);
  }

  function handleCopy(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onClipboardCopy();
  }

  function handleAdd(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onAddTimestamp();
  }

  useEffect(() => {
    chrome.storage?.local.get("skipSeconds", (result) => {
      if (result.skipSeconds) {
        setSkipSeconds(result.skipSeconds);
      }
    });
  }, []);

  return (
    <header
      className="flex items-center gap-4 h-8 px-2 py-1 text-white bg-gray-500"
      role="button"
      onClick={onClick}
      onKeyDown={onClick}
    >
      <div className="text-base">{isOpen ? <ChevronUp size="1em" /> : <ChevronDown size="1em" />}</div>

      <ButtonGroup>
        <Button title={`${skipSeconds.longBackward}秒戻る`} onClick={skipBackwardLong}>
          <ChevronsLeft className="mt-[2px]" size="1em" />
          {skipSeconds.longBackward}s
        </Button>
        <Button title={`${skipSeconds.shortBackward}秒戻る`} onClick={skipBackwardShort}>
          <ChevronLeft className="mt-[2px]" size="1em" />
          {skipSeconds.shortBackward}s
        </Button>
        <Button title={`${skipSeconds.shortFoward}秒進む`} onClick={skipForwardShort}>
          {skipSeconds.shortFoward}s
          <ChevronRight className="mt-[2px]" size="1em" />
        </Button>
        <Button title={`${skipSeconds.longFoward}秒進む`} onClick={skipForwardLong}>
          {skipSeconds.longFoward}s
          <ChevronsRight className="mt-[2px]" size="1em" />
        </Button>
      </ButtonGroup>

      <Button className="ml-auto" title="クリップボードにコピー" circle onClick={handleCopy}>
        <ClipboardCopy size="1em" />
      </Button>

      <Button circle title="スタンプを追加" onClick={handleAdd}>
        <Plus size="1em" />
      </Button>
    </header>
  );
}
