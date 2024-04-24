import { HeaderNode } from '../types/header_node';

export function getHeaders(mdString: string): string[] {
    const headers = mdString.match(/^#+\s.+/gm);
    return headers || [];
}

export function toHeadersTree(headers: string[]): HeaderNode[] {

    // root node is a container for the headers
    const rootNode: HeaderNode = { text: "root", level: -1, childs: [], index: -1, relativeIndex: -1 };


    let parent = rootNode;

    for (let i = 0; i < headers.length; i++) {
        const node = toHeaderNode(headers[i]);

        while (node.level <= parent.level) {
            parent = parent.parent;
        }

        node.index = i;
        node.parent = parent;
        node.depth = calculateDepth(node) - 1; // -1 because the root node is not a header
        node.relativeIndex = parent.childs.length;

        parent.childs.push(node);
        parent = node.level === parent.level ? parent.parent : node;
    }


    // remove the parent property from the root childs because root node is not a header, it is just a container
    for (const child of rootNode.childs)
        delete child.parent;

    return rootNode.childs;
}


export function toMdHeaderLinks(root: HeaderNode): string {
    const mdHeaders: string[] = [];
    const flatChilds = toFlat(root).sort((a, b) => a.index - b.index);

    for (const headerNode of flatChilds) {
        const index = toIndexTree(headerNode);
        const indentation = '\t'.repeat(headerNode.depth);
        const mdHeader = `${indentation}- ${index} [[${headerNode.text}]]`;
        mdHeaders.push(mdHeader);
    }

    return mdHeaders.join('\n');
}

function toFlat(root: HeaderNode): HeaderNode[] {
    const flatChilds: HeaderNode[] = [root];

    if (!root.childs) return flatChilds;

    for (const childNode of root.childs) {
        // flatChilds.push(childNode);
        flatChilds.push(...toFlat(childNode));
    }

    return flatChilds;
}


export function toIndexTree(root: HeaderNode): string {
    const indexes: number[] = [];

    let current = root;

    do {
        indexes.push(current.relativeIndex + 1);
        current = current.parent;
    } while (current)

    return indexes.reverse().join('.');
}


function calculateDepth(node: HeaderNode): number {
    let depth = 0;
    let current = node;
    while (current.parent) {
        depth++;
        current = current.parent;
    }
    return depth;
}


function toHeaderNode(h: string): HeaderNode {
    const level = h.match(/^#+/g)[0]?.length;
    const text = h//.replace(/^#+\s/, '');
    return { text, level, childs: [] };
}