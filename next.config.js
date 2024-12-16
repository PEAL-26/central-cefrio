// Injected content via Sentry wizard below
const { withSentryConfig } = require('@sentry/nextjs');

require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.hbs$/i,
        use: 'raw-loader',
      },
    );
    config.plugins.push();
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

if (process.env.SENTRY_ENABLE === 'true') {
  module.exports = withSentryConfig(nextConfig, {
    org: process.env.SENTRY_ORGANIZATION,
    project: process.env.SENTRY_PROJECT,
    silent: !process.env.CI,
    widenClientFileUpload: true,
    reactComponentAnnotation: {
      enabled: true,
    },
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  });
} else {
  module.exports = nextConfig;
}
