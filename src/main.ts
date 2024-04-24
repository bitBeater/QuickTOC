import { Editor, Plugin } from 'obsidian';
import { setToc } from './services/set_toc';


/****************************************************
* Remember to rename these classes and interfaces!   *
****************************************************/




export default class QuickTOC extends Plugin {

	async onload() {
		this.addCommand({
			id: 'generate_toc',
			name: 'Generate TOC',
			editorCallback: (editor: Editor) => {
				setToc(editor);
			},
		});
	}
}