import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../../components/Button';
import type { Timestamp } from '../../lib/types';
import { parseTime } from '../../content/lib/time';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

type Props = {
  className?: string;
  videoId: string;
  items: Timestamp[];
  onDelete: () => void;
};

export const ListItem = ({ className, videoId, items, onDelete }: Props) => {
  const [open, setOpen] = useState(false);

  const imageSrc = new URL(`/vi/${videoId}/mqdefault.jpg`, 'https://i.ytimg.com').toString();

  const watchUrl = (id: string, time?: string): string => {
    if (!time) {
      return `https://www.youtube.com/watch?v=${id}`;
    }

    const sec = parseTime(time);
    return `https://www.youtube.com/watch?v=${id}&t=${sec}`;
  };

  const handleClick = () => {
    setOpen((o) => !o);
  };

  return (
    <div className={twMerge('flex items-start justify-start gap-x-4 overflow-hidden', className)}>
      <div>
        <a href={watchUrl(videoId)} target="_blank" rel="noreferrer noopener">
          <img className="h-[180px] w-[320px] object-cover" src={imageSrc} width={320} height={180} alt={videoId} />
        </a>
      </div>
      <div>
        <Button className="" variant="white" onClick={handleClick}>
          {items.length} 個のタイムスタンプ
          {open ? <ChevronUp size="1em" /> : <ChevronDown size="1em" />}
        </Button>
        {open && (
          <div className="">
            <ul className="list-none">
              {items.map((item) => (
                <li key={item.id} className="mt-0.5 flex items-center gap-x-2 first:mt-0">
                  <span>
                    <a
                      className="text-blue-500 underline"
                      href={watchUrl(videoId, item.time)}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {item.time}
                    </a>
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Button className="ml-auto" variant="danger" onClick={onDelete}>
        削除
      </Button>
    </div>
  );
};
