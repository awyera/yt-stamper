import { $ } from 'bun';

import '../src/manifest.json';
import '../src/options/index.html';

await $`cp ./src/manifest.json ./out/manifest.json`;
await $`cp ./src/options/index.html ./out/options.html`;
