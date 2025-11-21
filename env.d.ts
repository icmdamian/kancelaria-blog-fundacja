/// <reference types="astro/client" />

type BlogDomain =
  | 'RODZINA_BEZ_DŁUGÓW_PL'
  | 'RODZINA_BEZ_DŁUGÓW_COM'
  | 'POWSTRZYMAJ_KOMORNIKA'
  | 'FUNDACJA';

interface ImportMetaEnv {
  readonly NODE_ENV: 'development' | 'production';
  readonly BLOG_DOMAIN: BlogDomain;
  readonly STRAPI_API_URL: string;
  readonly STRAPI_IMAGES_URL: string;
  readonly STRAPI_API_TOKEN: string;
  readonly SENTRY_AUTH_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type Runtime = import('@astrojs/cloudflare').Runtime<ImportMetaEnv>;

declare namespace App {
  interface Locals extends Runtime {}
}
