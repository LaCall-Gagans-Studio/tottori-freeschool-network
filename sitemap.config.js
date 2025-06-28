/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://tottori-yawaraka-infos.org',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  additionalPaths: async (config) => [
    await config.transform(config, '/org'),
    await config.transform(config, '/roadmap'),
    await config.transform(config, '/network/events'),
    // Add any other virtual paths you want to include
  ],
};
