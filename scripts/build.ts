#!/usr/bin/env -S deno run -A
import builtins from 'builtin-modules';
import esbuild from 'esbuild';
import { join } from 'https://deno.land/std@0.223.0/path/mod.ts';
import { $$ } from 'https://deno.land/x/sced@v1.1.6/src/sced.ts';
import { log } from 'npm:iggs-utils@1.3.1';
import { DIST, SRC } from './utils.ts';

const bLogger = new log.Logger({ logLevel: log.LogLevel.INFO }).step('[BUILD]');
const bundleStep = bLogger.step('[BUNDLE]');

const srcAssetsToMove = ['styles.css'];

const entryPoints = [join(SRC, 'main.ts')];
const outfile = join(DIST, 'main.js');
const prod = Deno.args.includes('prod');


const context = await esbuild.context({
    entryPoints,
    bundle: true,
    external: [
        'obsidian',
        'electron',
        '@codemirror/autocomplete',
        '@codemirror/collab',
        '@codemirror/commands',
        '@codemirror/language',
        '@codemirror/lint',
        '@codemirror/search',
        '@codemirror/state',
        '@codemirror/view',
        '@lezer/common',
        '@lezer/highlight',
        '@lezer/lr',
        ...builtins,
    ],
    format: 'cjs',
    target: 'es2018',
    logLevel: 'debug',
    sourcemap: prod ? false : 'inline',
    treeShaking: true,
    outfile,
});

if (prod) {
    await context.rebuild();
    bundleStep.info(`${entryPoints.join(', ')} -> ${outfile}`);
} else {
    await context.watch();
}

bundleStep.finish();
//---------------------------------------------------------------------------------------------------------------------

const assetStep = bLogger.step('[ASSETS]');


$$`npm run mkmanifest`;

for (const asset of srcAssetsToMove) {
    const from = join(SRC, asset);
    const to = join(DIST, asset);
    $$`cp ${from} ${to}`;
    assetStep.info(`${from} => ${to}`);
}
// srcAssetsToMove.forEach(asset => $$`cp -v ${join(SRC, asset)} ${join(DIST, asset)}`);

assetStep.finish();
bLogger.finish();
Deno.exit(0);
