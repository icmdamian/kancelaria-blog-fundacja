import { pageSize as defautPageSize } from './const';
import { createStrapiClient } from './strapi-client';
import type { PostEntity, PostsResponse, StrapiQueryParams } from './types';
import type { CategoryCount } from './types/category-count';
import type { PostSlug } from './types/post-slug';

export class StrapiPostEndpoints {
  private static client = createStrapiClient();

  public static async getCategoryPostCount(): Promise<CategoryCount[]> {
    return this.client.get<CategoryCount[]>('/categories/post-count');
  }

  public static async getAllPostSlugs(): Promise<PostSlug[]> {
    return this.client.get<PostSlug[]>('/posts/slugs');
  }

  public static async getCategoryPosts(
    categorySlug: string,
    page: number,
    pageSize: number = defautPageSize,
  ): Promise<PostsResponse> {
    const defaultParams: StrapiQueryParams = {
      sort: ['publishedAt:desc'],
      filters: {
        isVisible: true,
        category: {
          slug: categorySlug,
        },
      },
      populate: ['picture', 'category'],
      pagination: {
        page,
        pageSize,
      },
    };

    return this.client.get<PostsResponse>('posts', defaultParams);
  }

  public static async getPostBySlug(slug: string): Promise<PostEntity | null> {
    const params: StrapiQueryParams = {
      populate: ['content', 'faq', 'picture', 'content.picture', 'category'],
      filters: { slug, isVisible: true },
      pagination: { limit: 1 },
    };

    const response = await this.client.get<PostsResponse>('posts', params);

    if (response.data && response.data.length > 0) {
      return response.data[0];
    }

    return null;
  }
}
