import {
  createStrapiClient,
  type PostEntity,
  type PostsResponse,
  type StrapiQueryParams,
} from ".";

export class StrapiPostEndpoints {
  private static client = createStrapiClient();
  private static readonly ENDPOINT = "posts";

  public static async getAllPosts(
    params?: StrapiQueryParams
  ): Promise<PostEntity[]> {
    const defaultParams: StrapiQueryParams = {
      sort: ["publishedAt:desc"],
      filters: { isVisible: true },
      ...params,
    };

    const response = await this.client.get<PostsResponse>(
      this.ENDPOINT,
      defaultParams
    );
    return response.data;
  }

  public static async getPostBySlug(slug: string): Promise<PostEntity | null> {
    const defaultParams: StrapiQueryParams = {
      populate: ["content", "faq"],
      filters: { slug, isVisible: true },
      pagination: { limit: 1 },
    };

    try {
      const response = await this.client.get<PostsResponse>(
        this.ENDPOINT,
        defaultParams
      );
      if (response.data && response.data.length > 0) {
        return response.data[0];
      }
      return null;
    } catch (error) {
      console.error(`Error fetching post with slug: ${slug}`, error);
      return null;
    }
  }
}
