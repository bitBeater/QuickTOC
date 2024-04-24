#!/usr/bin/env -S deno run -A
import { log } from 'npm:iggs-utils@1.3.1';
import packageJson from '../package.json' with { type: 'json' };
import { MANIFEST } from './utils.ts';

/**
 * @link see docs https://docs.npmjs.com/cli/v10/configuring-npm/package-json#funding
 */
type PackageJsonFunding = string | { type: string, url: string } | PackageJsonFunding[];

/**
 * @link see docs https://docs.obsidian.md/Reference/Manifest#fundingUrl
 */
type ObsidianManifestFunding = { [key: string]: string };

function parseFunding(funding: PackageJsonFunding): ObsidianManifestFunding {
    if (typeof funding === 'string') return { [new URL(funding).hostname]: funding };
    if (Array.isArray(funding)) return funding.reduce((acc, f) => ({ ...acc, ...parseFunding(f) }), {});
    if (typeof funding === 'object') return { [funding.type]: funding.url };
    throw new Error('Invalid funding type', funding);
}

// ----------------------------------------------------------------------------------------------


const manifeStep = new log.Logger({ logLevel: log.LogLevel.INFO }).step('[MK_MANIFEST]');


const author = (packageJson?.author?.name || packageJson?.author) as string;
const manifest = {
    id: `${author}@${packageJson?.name}`.replaceAll?.(/\s+/g, '_'),
    name: packageJson?.name,
    version: packageJson?.version,
    description: packageJson?.description,
    author: packageJson?.author?.name || packageJson?.author,
    authorUrl: packageJson?.author?.url,
    fundingUrl: parseFunding(packageJson?.funding),
    ...packageJson.manifest,
}



Deno.writeTextFile(MANIFEST, JSON.stringify(manifest, null, 2));

manifeStep.info(`Manifest -> ${MANIFEST}`);
manifeStep.finish()
