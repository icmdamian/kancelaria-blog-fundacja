import type {
  BlocksContent,
  ContentBlockComponent,
  Domain,
  FaqComponent,
  StrapiEntity,
  StrapiResponse,
} from ".";

export interface Post {
  title: string;
  slug: string;
  domain: Domain;
  isVisible: boolean;
  pictureUrl?: string;
  introduction: string;
  content: ContentBlockComponent[];
  faq: FaqComponent[];
  references?: BlocksContent;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type PostEntity = StrapiEntity<Post>;
export type PostsResponse = StrapiResponse<PostEntity[]>;
