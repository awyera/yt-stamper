import { useEffect, useState } from 'react';
import { DEFAULT_SHORTCUTS, DEFAULT_SKIP_SECONDS } from '../lib/const';
import type { Shortcuts, SkipSeconds } from '../lib/types';
import { Form } from './components/Form';

export function App() {
  const [skipSeconds, setSkipSeconds] = useState<SkipSeconds>(DEFAULT_SKIP_SECONDS);
  const [shortcuts, setShortcuts] = useState<Shortcuts>(DEFAULT_SHORTCUTS);
  const [message, setMessage] = useState<string>('');

  function handleSkipChange(name: string, value: number) {
    setMessage('');
    setSkipSeconds((skipSeconds) => ({ ...skipSeconds, [name]: value }));
  }

  function handleSave() {
    chrome.storage.local.set({ skipSeconds, shortcuts }).then(() => {
      setMessage('保存しました');
    });
  }

  // storage から読み込み
  useEffect(() => {
    chrome.storage?.local.get(['skipSeconds', 'shortcuts'], (result) => {
      if (result.skipSeconds) {
        setSkipSeconds(result.skipSeconds);
      }
      if (result.shortcuts) {
        setShortcuts(result.shortcuts);
      }
    });
  }, []);

  return (
    <section className="mx-auto my-8 w-96 border border-gray-500 border-solid px-4 py-2">
      <section>
        <h2 className="text-lg">スキップ秒数</h2>
        <Form
          type="number"
          inputClassName="w-20"
          label="Long Backward (sec)"
          name="longBackward"
          value={skipSeconds.longBackward}
          onChange={handleSkipChange}
        />
        <Form
          type="number"
          inputClassName="w-20"
          label="Short Backward (sec)"
          name="shortBackward"
          value={skipSeconds.shortBackward}
          onChange={handleSkipChange}
        />
        <Form
          type="number"
          inputClassName="w-20"
          label="Short Forward (sec)"
          name="shortForward"
          value={skipSeconds.shortForward}
          onChange={handleSkipChange}
        />
        <Form
          type="number"
          inputClassName="w-20"
          label="Long Forward (sec)"
          name="longForward"
          value={skipSeconds.longForward}
          onChange={handleSkipChange}
        />
      </section>

      <div className="mt-4 flex items-center justify-end gap-2">
        {message ? <p className="font-bold text-green-600 text-sm">{message}</p> : null}
        <button
          className="rounded bg-green-500 px-2 py-1 font-bold text-white active:bg-green-700 hover:bg-green-600"
          type="button"
          onClick={handleSave}
        >
          SAVE
        </button>
      </div>
    </section>
  );
}
