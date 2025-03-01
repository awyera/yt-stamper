import { format } from 'date-fns';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../../components/Button';
import { parseTime } from '../../content/lib/time';
import type { VideoTimestamps } from '../../lib/types';

type Props = {
  className?: string;
  videoId: string;
  videoTimestamps: Omit<VideoTimestamps, 'videoDetails'> & {
    videoDetails: Omit<VideoTimestamps['videoDetails'], 'publishedAt'> & { publishedAt: Date };
  };
  onDelete: (videoId: string) => void;
};

export const ListItem = ({ className, videoId, videoTimestamps, onDelete }: Props) => {
  const [open, setOpen] = useState(false);

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

  const handleDelete = () => {
    onDelete(videoId);
  }

  return (
    <div className={twMerge('flex items-start justify-start gap-x-4 overflow-hidden', className)}>
      <div>
        <a href={watchUrl(videoId)} target="_blank" rel="noreferrer noopener">
          <img
            className="h-[180px] w-[320px] object-cover"
            src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}
            width={320}
            height={180}
            alt={videoId}
          />
        </a>
      </div>
      <div>
        <p className="font-bold mb-2">{videoTimestamps.videoDetails.title}</p>
        <a
          className="text-blue-500 underline"
          href={`https://www.youtube.com/channel/${videoTimestamps.videoDetails.channelId}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          {videoTimestamps.videoDetails.author}
        </a>
        <p>{format(videoTimestamps.videoDetails.publishedAt, 'yyyy/MM/dd HH:mm')}</p>
        <Button className="" variant="white" onClick={handleClick}>
          {videoTimestamps.list.length} 個のタイムスタンプ
          {open ? <ChevronUp size="1em" /> : <ChevronDown size="1em" />}
        </Button>
        {open && (
          <div className="">
            <ul className="list-none">
              {videoTimestamps.list.map((item) => (
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
      <Button className="ml-auto" variant="danger" onClick={handleDelete}>
        削除
      </Button>
    </div>
  );
};
