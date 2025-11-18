import { BlocksContent } from './blocks-content';
import { Domain, StrapiEntity, StrapiResponse } from './common';
import { ContentBlockComponent, FaqComponent } from './components';
import { Image } from './image';

export interface Category {
  name: string;
  slug: string;
}

export interface Post {
  title: string;
  slug: string;
  domain: Domain;
  isVisible: boolean;
  picture?: Image;
  introduction: BlocksContent;
  content: ContentBlockComponent[];
  faq: FaqComponent[];
  references?: BlocksContent;
  category: Category;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type PostEntity = StrapiEntity<Post>;
export type PostsResponse = StrapiResponse<PostEntity[]>;
