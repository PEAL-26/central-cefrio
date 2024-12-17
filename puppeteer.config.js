require('dotenv').config();

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  chrome: {
    skipDownload: false,
  },
  cacheDirectory: process.env.PUPPETEER_CACHE_DIRECTORY || undefined,
};
