import * as Sentry from "@sentry/astro";

Sentry.init({
  defaultIntegrations: false,
  dsn: "https://48e97e97aaced7d959259495bba33058@o4509763200548864.ingest.de.sentry.io/4509763201925200",
  tracesSampleRate: 0,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
  sendDefaultPii: true,
});
