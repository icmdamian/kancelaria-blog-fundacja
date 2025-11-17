import type { BlocksContent } from ".";

export interface ContentBlockComponent {
  title?: string;
  content?: BlocksContent;
  isVisible: boolean;
  pictureUrl?: string;
}

export interface FaqComponent {
  question: string;
  answer: BlocksContent;
  isVisible: boolean;
}
