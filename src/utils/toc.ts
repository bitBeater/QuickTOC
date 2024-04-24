import { MdString } from 'src/types/md_string';
import { getHeaders, toHeadersTree, toMdHeaderLinks } from './headers';
import { TOC_REGEX, beginTOC, endTOC, tocTitle } from './vars';

/**
 * removes the table of contents bounded by the beginTOC and endTOC comments
 * @example
 * ```ts
 * removeTOC(`<!-- TOC BEGIN --> - [[#Header 1]] <!-- TOC END --> # Header 1 \n blah blah blah`);
 * // 
 * // # Header 1
 * // blah blah blah
 * ```
 * 
 * @param mdString 
 * @returns 
 */
export function removeTOC(mdString: MdString): MdString {
    return mdString.replace(TOC_REGEX, '');
}

/**
 * creates a table of contents from the headers in the markdown string
 * the table of contents is wrapped in the beginTOC and endTOC comments and includes the title
 * @example
 * ```ts
 * const toc = createToc(`# Header 1 \n ## Header 2 \n ### Header 3`);
 * //
 * //   <-- TOC BEGIN -->
 * //   **Table of Contents**
 * //   - [[#Header 1]]
 * //     - [[#Header 2]]
 * //       - [[#Header 3]]
 * //   <-- TOC END -->
 * //
 * ```
 * @param mdString 
 * @returns 
 */
export function createToc(mdString: MdString): MdString {
    const headers = getHeaders(mdString);

    const headersTree = toHeadersTree(headers);
    const mdHeadersLinks = headersTree.map(toMdHeaderLinks);
    const toc = mdHeadersLinks.join('\n');

    return `${beginTOC}\n${tocTitle}\n${toc}\n---\n${endTOC}`;
}

/**
 * if the markdown string has a table of contents, it is replaced with the new table of contents,
 * else the new table of contents is appended to the end of the markdown string.
 * also ensures that there is a newline between the table of contents and the markdown string
 * @param mdString 
 * @param toc 
 */
export function mergeToc(mdString: MdString, toc: MdString): MdString {
    const hasToc = TOC_REGEX.test(mdString);

    if (hasToc) {
        return mdString.replace(TOC_REGEX, toc);
    }

    const hasNl = mdString.startsWith('\n');
    return `${toc}${hasNl ? '' : '\n'}${mdString}`;
}

