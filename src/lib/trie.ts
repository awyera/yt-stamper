interface SerializedTrieNode {
  children: { [key: string]: SerializedTrieNode };
  isEndOfWord: boolean;
  originalWords?: string[];
  ids?: string[];
}

class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  originalWords: Set<string>;
  ids: Set<string>;

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEndOfWord = false;
    this.originalWords = new Set<string>();
    this.ids = new Set<string>();
  }

  serialize(): SerializedTrieNode {
    const serializedChildren: { [key: string]: SerializedTrieNode } = {};
    this.children.forEach((child, key) => {
      serializedChildren[key] = child.serialize();
    });
    return {
      children: serializedChildren,
      isEndOfWord: this.isEndOfWord,
      originalWords: Array.from(this.originalWords),
      ids: Array.from(this.ids),
    };
  }

  static deserialize(data: SerializedTrieNode): TrieNode {
    const node = new TrieNode();
    node.isEndOfWord = data.isEndOfWord;
    node.originalWords = new Set(data.originalWords);
    node.ids = new Set(data.ids);
    for (const key in data.children) {
      node.children.set(key, TrieNode.deserialize(data.children[key]));
    }
    return node;
  }
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string, id: string): void {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      // biome-ignore lint/style/noNonNullAssertion: node が存在することは直前の処理で自明
      node = node.children.get(char)!;
      node.ids.add(id);
    }
    node.isEndOfWord = true;
    node.originalWords.add(word);
  }

  search(prefix: string): { words: string[], ids: string[] } {
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      const nextNode = node.children.get(char);
      if (!nextNode) {
        return { words: [], ids: [] };
      }
      node = nextNode;
    }
    return { words: this._collectAllWords(node), ids: Array.from(node.ids) }
  }

  private _collectAllWords(node: TrieNode): string[] {
    let words: string[] = [];
    if (node.isEndOfWord) {
      words = words.concat(Array.from(node.originalWords))
    }
    node.children.forEach((child) => {
      words = words.concat(this._collectAllWords(child));
    });
    return words;
  }

  serialize(): string {
    return JSON.stringify(this.root.serialize());
  }

  static deserialize(data: string): Trie {
    const trie = new Trie();
    const parsedData: SerializedTrieNode = JSON.parse(data);
    trie.root = TrieNode.deserialize(parsedData);
    return trie;
  }
}
