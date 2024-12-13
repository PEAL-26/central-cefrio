// Injected content via Sentry wizard below
const { withSentryConfig } = require("@sentry/nextjs");

const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const myEnv = dotenv.config({ path: ".env" });
dotenvExpand.expand(myEnv);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.hbs$/i,
        use: "raw-loader",
      }
    );
    config.plugins.push();
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withSentryConfig(nextConfig, {
  org: "pealsystems",
  project: "cefrio-invoice",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
