import { formatTime, parseTime } from '../lib/time';
import { useEffect, useRef, useState } from 'react';
import { Header } from './Header';
import { Stamp } from './Stamp';
import type { Timestamp } from '../../lib/types';
import { assertVideo } from '../lib/video-assert';
import { nanoid } from 'nanoid';
import { useShortcuts } from '../hooks/useShortcut';

type Props = {
  timestamps: Timestamp[];
  onChange: (timestamps: Timestamp[]) => void;
};

export function YTStamper({ timestamps, onChange }: Props) {
  useShortcuts({ toggleOpen, addTimestamp, copyToClipboard, skip });

  const [isOpen, setIsOpen] = useState(true);
  const [isDeleteMode, setDeleteMode] = useState(false);
  const [height, setHeight] = useState('');
  const [shouldScrollToButton, setShouldScrollToButton] = useState(false);

  const [video, setVideo] = useState<HTMLVideoElement | null>(null);

  const listRef = useRef<HTMLDivElement>(null);

  // 指定秒分再生時間をスキップ
  function skip(seconds: number) {
    assertVideo(video);
    video.currentTime += seconds;
    video.play();
  }

  // 再生時間を指定秒に変更
  function seek(seconds: number) {
    assertVideo(video);
    video.currentTime = seconds;
    video.play();
  }

  // 削除モードの切替
  function toggleDeleteMode() {
    setDeleteMode((isDeleteMode) => !isDeleteMode);
  }

  // 時間昇順にソート
  function sort() {
    const sorted = [...timestamps].sort((a, b) => {
      if (a.time === '') {
        // 未入力は末尾
        return 1;
      }
      return parseTime(a.time) - parseTime(b.time);
    });
    onChange(sorted);
  }

  // クリップボードにコピー
  function copyToClipboard() {
    const text = timestamps
      .filter((t) => t.time)
      .map((t) => `${t.time} ${t.text}`)
      .join('\n');
    navigator.clipboard.writeText(text);
  }

  function toggleOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  // timestamp を追加
  function addTimestamp() {
    assertVideo(video);

    setIsOpen(true);
    const time = isOpen ? '' : formatTime(video.currentTime);
    onChange([...timestamps, { id: nanoid(), time, text: '' }]);
    setShouldScrollToButton(true);
  }

  // timestamp を変更
  function changeTimestamp(timestamp: Timestamp) {
    onChange(timestamps.map((t) => (t.id === timestamp.id ? timestamp : t)));
  }

  // timestamp を削除
  function removeTimestamp(timestamp: Timestamp) {
    onChange(timestamps.filter((t) => t.id !== timestamp.id));
  }

  // タイムスタンプが追加された際に最下部へスクロールする
  useEffect(() => {
    if (shouldScrollToButton && listRef.current) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight });
      setShouldScrollToButton(false);
    }
  }, [shouldScrollToButton]);

  // 500ms 毎に video element を検索し、取得できたら終わる
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      // video の高さに合わせる
      setHeight(`${entry.contentRect.height}px`);
    });

    const interval = setInterval(() => {
      const videoElm = document.querySelector('video');
      if (videoElm) {
        setVideo(videoElm);
        clearInterval(interval);

        resizeObserver.observe(videoElm);
      }
    }, 500);

    return () => {
      clearInterval(interval);
      resizeObserver.disconnect();
    };
  }, []);

  if (!video) {
    // 動画が読み込まれていない場合は何も表示しない
    return null;
  }

  return (
    <div className="flex flex-col rounded-sm border border-gray-500 border-solid" style={{ maxHeight: height }}>
      <Header
        isOpen={isOpen}
        isDeleteMode={isDeleteMode}
        skip={skip}
        toggleDeleteMode={toggleDeleteMode}
        onSort={sort}
        onClipboardCopy={copyToClipboard}
        onAddTimestamp={addTimestamp}
        onClick={toggleOpen}
      />

      <div className="grow overflow-y-scroll overscroll-contain" style={{ height: isOpen ? 'auto' : 0 }} ref={listRef}>
        {timestamps.length > 0
          ? timestamps.map((timestamp) => (
              <Stamp
                className="my-2 border-t border-t-gray-500 border-solid px-1 pt-2 first:mt-0 first:border-t-0"
                key={timestamp.id}
                video={video}
                timestamp={timestamp}
                isDeleteMode={isDeleteMode}
                onChange={changeTimestamp}
                seek={seek}
                onDelete={removeTimestamp}
              />
            ))
          : null}
      </div>
    </div>
  );
}
