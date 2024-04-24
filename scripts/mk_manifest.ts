#!/usr/bin/env -S deno run -A
import { log } from 'npm:iggs-utils@1.3.1';
import packageJson from '../package.json' with { type: 'json' };
import { MANIFEST } from './utils.ts';


const manifeStep = new log.Logger({ logLevel: log.LogLevel.INFO }).step('[MK_MANIFEST]');


const author = (packageJson?.author?.name || packageJson?.author) as string;
const manifest = {
    id: `${author}@${packageJson?.name}`.replaceAll?.(/\s+/g, '_'),
    name: packageJson?.name,
    version: packageJson?.version,
    description: packageJson?.description,
    author: packageJson?.author?.name || packageJson?.author,
    authorUrl: packageJson?.author?.url,
    fundingUrl: packageJson?.funding?.url,
    ...packageJson.manifest,
}



Deno.writeTextFile(MANIFEST, JSON.stringify(manifest, null, 2));

manifeStep.info(`Manifest -> ${MANIFEST}`);
manifeStep.finish()
