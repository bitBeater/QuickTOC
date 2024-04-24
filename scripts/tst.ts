#!/usr/bin/env -S deno run --allow-env --allow-read --allow-run
import {
    Checkbox
} from 'https://deno.land/x/cliffy@v1.0.0-rc.4/prompt/mod.ts';
import { simpleGit, SimpleGit } from 'npm:simple-git';

type GitAction = 'commit' | "add";
const git: SimpleGit = simpleGit();

async function doGitAction(filesFn: () => string[], action: GitAction) {
    const files = filesFn();
    const selectedFiles = await Checkbox.prompt({ message: `unchek the files to not commit ${action}`, options: files, default: files });
    return git[action](selectedFiles);
}