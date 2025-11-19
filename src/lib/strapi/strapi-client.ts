import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { StrapiQueryParams } from './types';

class StrapiClient {
  private client: AxiosInstance;

  constructor(apiUrl: string, apiToken: string) {
    this.client = axios.create({
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
    });
  }

  public async get<T>(endpoint: string, params?: StrapiQueryParams): Promise<T> {
    const config: AxiosRequestConfig = { params };

    try {
      const response: AxiosResponse<T> = await this.client.get(endpoint, config);
      return response.data;
    } catch (error) {
      console.error(`Error fetching from ${endpoint}:`, error);
      throw error;
    }
  }
}

export const createStrapiClient = (apiUrl: string, apiToken: string): StrapiClient => {

  if (!apiUrl || !apiToken) {
    throw new Error('Missing required environment variables STRAPI_API_URL or STRAPI_API_TOKEN');
  }

  return new StrapiClient(apiUrl, apiToken);
};
