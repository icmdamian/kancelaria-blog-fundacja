/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NODE_ENV?: 'development' | 'production'
  readonly STRAPI_API_URL?: string;
  readonly STRAPI_IMAGES_URL?: string;
  readonly STRAPI_API_TOKEN?: string;
  readonly SENTRY_AUTH_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
