// const dotenv = require("dotenv");
// const dotenvExpand = require("dotenv-expand");

// const myEnv = dotenv.config();
// dotenvExpand.expand(myEnv);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  // distDir: "dist",
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "source.unsplash.com",
  //       port: "",
  //       pathname: "/random/**",
  //     },
  //   ],
  // },
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
  // images: {
  //   unoptimized: true,
  // },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
