import { pageSize as defautPageSize } from './const';
import { createStrapiClient } from './strapi-client';
import type { PostEntity, PostsResponse, StrapiQueryParams } from './types';

export class StrapiPostEndpoints {
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
        domain: StrapiPostEndpoints.getDomain(locals),
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
      filters: { slug, isVisible: true, domain: StrapiPostEndpoints.getDomain(locals) },
      pagination: { limit: 1 },
    };

    const response = await client.get<PostsResponse>('posts', params);

    if (response.data && response.data.length > 0) {
      return response.data[0];
    }

    return null;
  }

  private static getStrapiClient(locals: App.Locals) {
    const { STRAPI_API_URL, STRAPI_API_TOKEN } = locals.runtime.env;
    return createStrapiClient(STRAPI_API_URL, STRAPI_API_TOKEN);
  }

  private static getDomain(locals: App.Locals) {
    const domain = locals.runtime.env.BLOG_DOMAIN;

    if (!domain) {
      throw new Error('Missing required environment variable BLOG_DOMAIN');
    }

    return domain;
  }
}
