import { BlocksContent } from './blocks-content';
import { Image } from './image';

export interface ContentBlockComponent {
  title?: string;
  content?: BlocksContent;
  isVisible: boolean;
  picture?: Image;
}

export interface FaqComponent {
  question: string;
  answer: BlocksContent;
  isVisible: boolean;
}
