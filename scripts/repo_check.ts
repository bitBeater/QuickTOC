#!/usr/bin/env -S deno run --allow-env --allow-read --allow-run
import {
    Checkbox
} from 'https://deno.land/x/cliffy@v1.0.0-rc.4/prompt/mod.ts';
import { $$ } from "https://deno.land/x/sced@v1.1.6/src/mod.ts";

import { simpleGit, SimpleGit } from 'npm:simple-git';

type GitAction = 'commit' | "add";
type GitFileStatus = 'not_added' | 'staged' | 'modified' | 'deleted';
const git: SimpleGit = simpleGit();


async function interactiveGitAction(fileStatus: GitFileStatus, action: GitAction) {
    const files = (await git.status())[fileStatus];
    if (!files.length) return;
    const selectedFiles = await Checkbox.prompt({ message: `unchek the files not to ${action}`, options: files.map(f => ({ value: f, name: fileStatus + " " + f, checked: true })) }) as unknown as string[];

    if (!selectedFiles.length) return;


    const message = `${action} ${fileStatus}`;


    switch (action) {
        case 'add':
            await git.add(selectedFiles);
            break;
        case 'commit':
            await git.commit(message, selectedFiles);
            break;
    }
}
//--------------------------------------------------------------------


$$`git push`;


await interactiveGitAction('not_added', 'add');
await interactiveGitAction('staged', 'commit');
await interactiveGitAction('modified', 'commit');
await interactiveGitAction('deleted', 'commit');

$$`git push`;
