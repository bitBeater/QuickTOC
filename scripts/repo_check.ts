#!/usr/bin/env -S deno run --allow-env --allow-read --allow-run
import {
    Checkbox
} from 'https://deno.land/x/cliffy@v1.0.0-rc.4/prompt/mod.ts';
import { $$ } from "https://deno.land/x/sced@v1.1.6/src/mod.ts";

import { simpleGit, SimpleGit } from 'npm:simple-git';

type GitAction = 'commit' | "add";
type GitFileStatus = 'not_added' | 'staged' | 'modified' | 'deleted';
const git: SimpleGit = simpleGit();


async function doGitAction(fileStatus: GitFileStatus, action: GitAction) {
    const files = (await git.status())[fileStatus];
    if (!files.length) return;
    const selectedFiles = await Checkbox.prompt({ message: `unchek the files not to ${action}`, options: files.map(f => ({ value: f, name: fileStatus + " " + f, checked: true })) }) as unknown as string[];

    if (!selectedFiles.length) return;

    await git[action](selectedFiles);
}
//--------------------------------------------------------------------




await doGitAction('not_added', 'add');
await doGitAction('staged', 'commit');
await doGitAction('modified', 'commit');
await doGitAction('deleted', 'commit');

$$`git push`;
