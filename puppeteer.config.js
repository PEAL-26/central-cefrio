/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  chrome: {
    skipDownload: false,
  },
  cacheDirectory: '/vercel/.cache/puppeteer',
};

//chrome@130.0.6723.69 /vercel/.cache/puppeteer/chrome/linux-130.0.6723.69/chrome-linux64/chrome