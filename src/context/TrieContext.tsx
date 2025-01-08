import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { loadTrieFromLocalStorage } from '../lib/storage';
import type { Trie } from '../lib/trie';

const TrieContext = createContext<Trie | null>(null);

export const TrieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trie, setTrie] = useState<Trie | null>(null);

  useEffect(() => {
    loadTrieFromLocalStorage().then(setTrie);
  }, []);

  return <TrieContext.Provider value={trie}>{children}</TrieContext.Provider>;
};

export const useTrie = () => useContext(TrieContext);
