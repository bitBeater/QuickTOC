import { Editor } from 'obsidian';
import { createToc, mergeToc } from 'src/utils/toc';





export function setToc(editor: Editor) {
    const note = editor.getValue();
    // const cleanNote = removeTOC(note);
    const toc = createToc(note);
    const noteWithToc = mergeToc(note, toc);
    editor.setValue(noteWithToc);
}