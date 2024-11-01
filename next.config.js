const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const myEnv = dotenv.config({ path: ".env.local" });
dotenvExpand.expand(myEnv);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/random/**",
      },

      {
        protocol: process.env.UPLOAD_FILE_PROTOCOL,
        hostname: process.env.UPLOAD_FILE_HOSTNAME,
        port: "",
      },
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push(
      //   {
      //   test: /\.svg$/,
      //   use: ["@svgr/webpack"],
      // },
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

module.exports = nextConfig;
