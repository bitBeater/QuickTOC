import { load } from 'https://deno.land/std@0.223.0/dotenv/mod.ts';
import { join } from 'https://deno.land/std@0.223.0/path/mod.ts';
import packageJson from '../package.json' with { type: 'json' };

const env = await load();

export const SRC = 'src';
export const DIST = 'dist';
export const MANIFEST = join(DIST, 'manifest.json');
export const DEPLOY_DIR = join(env.VAULT_DIR, '.obsidian', 'plugins', packageJson.name);
