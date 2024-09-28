import { useEffect, useState } from 'react';
import { loadAllData, removeData } from '../../lib/storage';
import type { Timestamp } from '../../lib/types';
import { Card } from '../components/Card';

export function Manage() {
  const [allData, setAllData] = useState<Record<string, Timestamp[]>>();

  const handleDelete = (videoId: string) => async () => {
    if (confirm('削除しますか？')) {
      await removeData(videoId);
      setAllData(await loadAllData());
    }
  };

  useEffect(() => {
    loadAllData().then((data) => {
      setAllData(data);
    });
  }, []);

  if (!allData) {
    return <p>作成したタイムスタンプがありません。</p>;
  }

  return (
    <section className="flex flex-wrap gap-4 p-4">
      {Object.keys(allData).map((key) => (
        <Card className="shrink-0" videoId={key} items={allData[key]} onDelete={handleDelete(key)} key={key} />
      ))}
    </section>
  );
}
