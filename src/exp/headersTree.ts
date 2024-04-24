import { toHeadersTree, toMdHeaderLinks } from "../utils/headers";


const headers = [
    "# Header 1",
    "## Header 2",
    "### Header 3",
    "## Header 4",
    "# Header 5",
    "### Header 6",
    "###### Header 7",
    "### Header 8",
    "### Header 9",
    "##### Header 10",
    "###### Header 11",
    "# Header 12",
];

const headersTree = toHeadersTree(headers);
const mdHeadersLink = headersTree.map(toMdHeaderLinks).join('\n');

console.log(mdHeadersLink);
// printHeadersTree(headersTree);
