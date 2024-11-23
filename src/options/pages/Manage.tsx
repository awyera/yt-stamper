import { type ChangeEvent, useEffect, useState } from 'react';
import { useTrie } from '../../context/TrieContext';
import { loadAllData, removeData } from '../../lib/storage';
import type { Timestamp } from '../../lib/types';
import { ListItem } from '../components/ListItem';

export function Manage() {
  const trie = useTrie();
  const [allData, setAllData] = useState<Record<string, Timestamp[]>>({});
  const [data, setData] = useState<Record<string, Timestamp[]>>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (trie && value) {
      const result = trie.search(value);
      const filtered = result.ids.reduce<Record<string, Timestamp[]>>((filtered, id) => {
        filtered[id] = allData[id];
        return filtered;
      }, {});
      setData(filtered);
    } else {
      setData(allData);
    }
  };

  const handleDelete = (videoId: string) => async () => {
    if (confirm('削除しますか？')) {
      await removeData(videoId);
      setAllData(await loadAllData());
    }
  };

  useEffect(() => {
    loadAllData().then((data) => {
      setAllData(data);
      setData(data);
    });
  }, []);

  if (!data) {
    return <p>作成したタイムスタンプがありません。</p>;
  }

  return (
    <section className="container mx-auto">
      <input className='border' type="text" onChange={handleChange} />

      {Object.keys(data).map((key) => (
        <ListItem
          className="mt-4 border-t pt-4 first:mt-0 first:border-none first:p-0"
          videoId={key}
          items={allData[key]}
          onDelete={handleDelete(key)}
          key={key}
        />
      ))}
    </section>
  );
}
