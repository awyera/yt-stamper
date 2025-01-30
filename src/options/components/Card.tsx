import { Button } from '../../components/Button';
import type { Timestamp } from '../../lib/types';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
  videoId: string;
  items: Timestamp[];
  onDelete: () => void;
};

export function Card({ className, videoId, items, onDelete }: Props) {
  const imageSrc = new URL(`/vi/${videoId}/mqdefault.jpg`, 'https://i.ytimg.com').toString();

  return (
    <div className={twMerge('w-80 overflow-hidden rounded-sm shadow-md', className)}>
      <div>
        <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noreferrer noopener">
          <img className="h-[180px] w-[320px] object-cover" src={imageSrc} width={320} height={180} alt={videoId} />
        </a>
      </div>
      <div className="px-4 py-2">
        <p>{items.length} 個のタイムスタンプ</p>
        <Button className="mt-1" variant="danger" onClick={onDelete}>
          削除
        </Button>
      </div>
    </div>
  );
}
