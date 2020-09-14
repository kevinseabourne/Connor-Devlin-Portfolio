import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/apm";

function init() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    integrations: [new Integrations.Tracing()],
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
