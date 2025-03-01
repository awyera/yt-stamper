import { type ChangeEvent, useEffect, useState } from 'react';
import { useTrie } from '../../context/TrieContext';
import { loadAllVideoTimestamps, removeData } from '../../lib/storage';
import type { StorageData } from '../../lib/types';
import { ListItem } from '../components/ListItem';

export function Manage() {
  const trie = useTrie();
  const [allData, setAllData] = useState<StorageData['videoTimestamps']>({});
  const [data, setData] = useState<StorageData['videoTimestamps']>({});

  const sortedData = Object.values(data)
    .map((d) => ({ ...d, videoDetails: { ...d.videoDetails, publishedAt: new Date(d.videoDetails.publishedAt) } }))
    .sort((a, b) => {
      const pA = a.videoDetails.publishedAt;
      const pB = b.videoDetails.publishedAt;
      if (pA === pB) {
        return 0;
      }
      return pA > pB ? -1 : 1;
    });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (trie && value) {
      const result = trie.search(value);
      const filtered = result.videoIds.reduce<StorageData['videoTimestamps']>((filtered, id) => {
        filtered[id] = allData[id];
        return filtered;
      }, {});
      setData(filtered);
    } else {
      setData(allData);
    }
  };

  const handleDelete = async (videoId: string) => {
    if (confirm('削除しますか？')) {
      await removeData(videoId);
      loadAllVideoTimestamps().then((data) => {
        setAllData(data);
        setData(data);
      });
    }
  };

  useEffect(() => {
    loadAllVideoTimestamps().then((data) => {
      setAllData(data);
      setData(data);
    });
  }, []);

  if (!data) {
    return <p>作成したタイムスタンプがありません。</p>;
  }

  return (
    <section className="container mx-auto">
      <input className="border" type="text" onChange={handleChange} />

      {sortedData.map((data) => (
        <ListItem
          className="mt-4 border-t pt-4 first:mt-0 first:border-none first:p-0"
          videoId={data.videoDetails.videoId}
          videoTimestamps={data}
          onDelete={handleDelete}
          key={data.videoDetails.videoId}
        />
      ))}
    </section>
  );
}
