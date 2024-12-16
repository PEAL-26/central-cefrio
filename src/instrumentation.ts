import * as Sentry from '@sentry/nextjs';

require('dotenv').config();

let onRequestError = null;
let register = null;

if (process.env.SENTRY_ENABLE === 'true') {
  register = async () => {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      await import('../sentry.server.config');
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
      await import('../sentry.edge.config');
    }
  };

  onRequestError = Sentry.captureRequestError;
}

export { onRequestError, register };
