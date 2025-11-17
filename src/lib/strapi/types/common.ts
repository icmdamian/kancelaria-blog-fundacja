export enum Domain {
  RODZINA_BEZ_DŁUGÓW_PL = "RODZINA_BEZ_DŁUGÓW_PL",
  RODZINA_BEZ_DŁUGÓW_COM = "RODZINA_BEZ_DŁUGÓW_COM",
  POWSTRZYMAJ_KOMORNIKA = "POWSTRZYMAJ_KOMORNIKA",
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
  start?: number;
  limit?: number;
}

export interface ResponseMeta {
  pagination: PaginationMeta;
}

export interface StrapiResponse<T> {
  data: T;
  meta: ResponseMeta;
}

export type StrapiEntity<T> = {
  id: number;
  documentId: string;
} & T;

export interface StrapiQueryParams {
  populate?: string | string[] | Record<string, any>;
  sort?: string | string[];
  filters?: Record<string, any>;
  pagination?: {
    page?: number;
    pageSize?: number;
    withCount?: boolean;
    limit?: number;
  };
  fields?: string | string[];
  publicationState?: "live" | "preview";
  locale?: string | string[];
}
