import {
  ArrowDown01,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
  ClipboardCopy,
  Eraser,
  Plus,
} from 'lucide-react';
import { useSkipSeconds } from '../hooks/useSkipSeconds';
import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';

interface Props {
  isOpen: boolean;
  isDeleteMode: boolean;
  skip: (time: number) => void;
  toggleDeleteMode: () => void;
  onSort: () => void;
  onClipboardCopy: () => void;
  onAddTimestamp: () => void;
  onClick: () => void;
}

export function Header({
  isOpen,
  isDeleteMode,
  skip,
  toggleDeleteMode,
  onSort,
  onClipboardCopy,
  onAddTimestamp,
  onClick,
}: Props) {
  const { skipSeconds, skipBackwardLong, skipBackwardShort, skipForwardLong, skipForwardShort } = useSkipSeconds(skip);

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
        <Button title={`${skipSeconds.shortForward}秒進む`} onClick={skipForwardShort}>
          {skipSeconds.shortForward}s
          <ChevronRight className="mt-[2px]" size="1em" />
        </Button>
        <Button title={`${skipSeconds.longForward}秒進む`} onClick={skipForwardLong}>
          {skipSeconds.longForward}s
          <ChevronsRight className="mt-[2px]" size="1em" />
        </Button>
      </ButtonGroup>

      <Button
        className="ml-auto"
        variant={isDeleteMode ? 'danger' : 'default'}
        title="スタンプ削除モード切替"
        circle
        onClick={toggleDeleteMode}
      >
        <Eraser size="1em" />
      </Button>

      <Button title="クリップボードにコピー" circle onClick={onClipboardCopy}>
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
