import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ClipboardCopy, Plus } from "lucide-react";
import { Button } from "./Button";

type Props = {
  onTimeChange: (time: number) => void;
  onClipboardCopy: () => void;
  onAddStamp: () => void;
};

export function Header({ onTimeChange, onClipboardCopy, onAddStamp }: Props) {
  function skipBackwardShort() {
    onTimeChange(-5);
  }

  function skipForwardShort() {
    onTimeChange(5);
  }

  function skipBackwardLong() {
    onTimeChange(-15);
  }

  function skipForwardLong() {
    onTimeChange(30);
  }

  return (
    <header className="flex items-center gap-8 px-2 py-1 text-white bg-gray-500">
      <h1 className="text-base">YTStamper</h1>

      <div className="flex items-center gap-2 ml-auto">
        <Button circle onClick={skipBackwardLong}>
          <ChevronsLeft size="1em" />
        </Button>
        <Button circle onClick={skipBackwardShort}>
          <ChevronLeft size="1em" />
        </Button>
        <Button circle onClick={skipForwardShort}>
          <ChevronRight size="1em" />
        </Button>
        <Button circle onClick={skipForwardLong}>
          <ChevronsRight size="1em" />
        </Button>
      </div>

      <Button circle onClick={onClipboardCopy}>
        <ClipboardCopy size="1em"  />
      </Button>

      <Button circle onClick={onAddStamp}>
        <Plus size="1em" />
      </Button>
    </header>
  );
}
