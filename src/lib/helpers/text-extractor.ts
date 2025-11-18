import type { BlocksContent } from '@strapi/blocks-react-renderer';

export const extractPlainText = (content: BlocksContent, limit: number): string => {
  let plainText = '';

  for (const block of content) {
    for (const children of block.children) {
      if (children.type === 'text') {
        plainText += children.text;
      } else if (children.type === 'link') {
        plainText += children.children.map((child) => child.text).join('');
      }
    }
  }

  return plainText.substring(0, limit) + (plainText.length >= limit ? '…' : '');
};
