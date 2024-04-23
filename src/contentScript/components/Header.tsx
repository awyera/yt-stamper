import {
  ArrowDown01,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
  ClipboardCopy,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DEFAULT_SKIP_SECONDS } from "../../lib/const";
import type { SkipSeconds } from "../../lib/types";
import { Button } from "./Button";
import { ButtonGroup } from "./ButtonGroup";

interface Props {
  isOpen: boolean;
  skip: (time: number) => void;
  onSort: () => void;
  onClipboardCopy: () => void;
  onAddTimestamp: () => void;
  onClick: () => void;
}

export function Header({ isOpen, skip, onSort, onClipboardCopy, onAddTimestamp, onClick }: Props) {
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
    <header className="flex h-8 items-center gap-2 bg-gray-500 px-2 py-1 text-white">
      <Button circle onClick={onClick}>
        {isOpen ? <ChevronUp size="1em" /> : <ChevronDown size="1em" />}
      </Button>

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

      <Button className="ml-auto" title="クリップボードにコピー" circle onClick={onClipboardCopy}>
        <ClipboardCopy size="1em" />
      </Button>

      <Button title="時間順にソート" circle onClick={onSort}>
        <ArrowDown01 size="1em" />
      </Button>

      <Button title="スタンプを追加" circle onClick={onAddTimestamp}>
        <Plus size="1em" />
      </Button>
    </header>
  );
}
