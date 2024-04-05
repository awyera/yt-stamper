import Bun from 'bun';
import { rm } from 'node:fs/promises';

const OUTDIR = './out';

// Clean
await rm(OUTDIR, { force: true, recursive: true })

// Build
await Bun.build({
  entrypoints: ['./src/contentScript/index.tsx'],
  outdir: OUTDIR,
  root: './src',
  naming: "[dir].[ext]"
})

// // Get contentScript filename.
// const outdir = await readdir(OUTDIR)
// const contentScriptName = outdir.find(v => v.startsWith('contentScript.'))

// // Copy manifest.json
// const manifestjson = Bun.file('./src/manifest.json', { type: 'application/json' })
// const manifest = await manifestjson.json();

// manifest.content_scripts[0].js[0] = contentScriptName;
// Bun.write(path.join(OUTDIR, 'manifest.json'), JSON.stringify(manifest, null, 2))
