export const beginTOC = '<!-- TOC BEGIN -->';
export const endTOC = '<!-- TOC END -->';
export const tocTitle = '**Table of Contents**';
export const TOC_REGEX = new RegExp(`${beginTOC}[\\s\\S]*${endTOC}[\\s\\S]---`, 'g');