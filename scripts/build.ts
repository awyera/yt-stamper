import Bun, { $ } from 'bun';
import { rm } from 'node:fs/promises';

const OUTDIR = './out';

// Clean
await rm(OUTDIR, { force: true, recursive: true });

// Build
await Bun.build({
  entrypoints: ['./src/contentScript/index.tsx'],
  outdir: OUTDIR,
  root: './src',
  naming: '[dir].[ext]',
});

// Copy manifest.json
$`cp ./src/manifest.json ./out/manifest.json`;
