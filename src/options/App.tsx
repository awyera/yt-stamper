import { useEffect, useState } from "react";
import type { SkipSeconds } from "../lib/types";
import { Form } from "./components/Form";
import { DEFAULT_SKIP_SECONDS } from "../lib/const";

export function App() {
  const [skipSeconds, setSkipSeconds] = useState<SkipSeconds>(DEFAULT_SKIP_SECONDS);
  const [message, setMessage] = useState<string>("");

  function handleChange(name: string, value: number) {
    setMessage("");
    setSkipSeconds((skipSeconds) => ({ ...skipSeconds, [name]: value }));
  }

  function handleSave() {
    chrome.storage.local.set({ skipSeconds }).then(() => {
      setMessage("保存しました");
    });
  }

  // storage から読み込み
  useEffect(() => {
    chrome.storage?.local.get("skipSeconds", (result) => {
      if (result.skipSeconds) {
        setSkipSeconds(result.skipSeconds);
        return;
      }
      setSkipSeconds(DEFAULT_SKIP_SECONDS);
    });
  }, []);

  return (
    <div className="w-96 my-8 mx-auto py-2 px-4 border border-solid border-gray-500">
      <Form label="Long Backward (sec)" name="longBackward" value={skipSeconds.longBackward} onChange={handleChange} />
      <Form
        label="Short Backward (sec)"
        name="shortBackward"
        value={skipSeconds.shortBackward}
        onChange={handleChange}
      />
      <Form label="Short Foward (sec)" name="shortFoward" value={skipSeconds.shortFoward} onChange={handleChange} />
      <Form label="Long Foward (sec)" name="longFoward" value={skipSeconds.longFoward} onChange={handleChange} />

      <div className="flex items-center justify-end gap-2 mt-4">
        {message ? <p className="text-sm text-green-600 font-bold">{message}</p> : null}
        <button
          className=" py-1 px-2 rounded text-white font-bold bg-green-500 hover:bg-green-600 active:bg-green-700"
          type="button"
          onClick={handleSave}
        >
          SAVE
        </button>
      </div>
    </div>
  );
}
