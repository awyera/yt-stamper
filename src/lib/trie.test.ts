import { describe, expect, it } from 'bun:test';
import { Trie } from './trie';

describe('Trie', () => {
  it('should serialize and deserialize correctly', () => {
    const trie = new Trie();
    const words = ["example", "examine", "excavate", "excellent"];
    for (const word of words) {
      trie.insert(word);
    }

    const serializedTrie = trie.serialize();
    const restoredTrie = Trie.deserialize(serializedTrie);

    // Check that the restored Trie contains the same words
    for (const word of words) {
      const results = restoredTrie.search(word.slice(0, 3));  // Search using first 3 letters
      expect(results).toContain(word);
    }

    // Check a prefix that doesn't exist
    const results = restoredTrie.search("xyz");
    expect(results).toEqual([]);
  });
});
