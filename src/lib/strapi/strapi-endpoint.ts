import { pageSize as defautPageSize } from './const';
import { createStrapiClient } from './strapi-client';
import type { PostEntity, PostsResponse, StrapiQueryParams } from './types';
import type { CategoryCount } from './types/category-count';
import type { PostSlug } from './types/post-slug';

export class StrapiPostEndpoints {
  public static async getCategoryPostCount(locals: App.Locals): Promise<CategoryCount[]> {
    const client = StrapiPostEndpoints.getStrapiClient(locals);
    return client.get<CategoryCount[]>('/categories/post-count');
  }

  public static async getAllPostSlugs(locals: App.Locals): Promise<PostSlug[]> {
    const client = StrapiPostEndpoints.getStrapiClient(locals);
    return client.get<PostSlug[]>('/posts/slugs');
  }

  public static async getCategoryPosts(
    locals: App.Locals,
    categorySlug: string,
    page: number,
    pageSize: number = defautPageSize,
  ): Promise<PostsResponse> {
    const client = StrapiPostEndpoints.getStrapiClient(locals);

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

    return client.get<PostsResponse>('posts', defaultParams);
  }

  public static async getPostBySlug(locals: App.Locals, slug: string): Promise<PostEntity | null> {
    const client = StrapiPostEndpoints.getStrapiClient(locals);

    const params: StrapiQueryParams = {
      populate: ['content', 'faq', 'picture', 'content.picture', 'category'],
      filters: { slug, isVisible: true },
      pagination: { limit: 1 },
    };

    const response = await client.get<PostsResponse>('posts', params);

    if (response.data && response.data.length > 0) {
      return response.data[0];
    }

    return null;
  }

  private static getStrapiClient(locals: App.Locals) {
    // const apiUrl = import.meta.env.STRAPI_API_URL;
    // const apiToken = import.meta.env.STRAPI_API_TOKEN;
    const { STRAPI_API_URL, STRAPI_API_TOKEN } = locals.runtime.env;
    return createStrapiClient(STRAPI_API_URL, STRAPI_API_TOKEN);
  }
}
