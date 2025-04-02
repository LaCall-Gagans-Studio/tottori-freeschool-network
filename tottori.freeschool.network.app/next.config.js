/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    },
    webpack: (/** @type {import('webpack').Configuration} */ config) => {
      config.optimization.splitChunks.maxSize = 20000000;
      return config;
    },
  };
  
  module.exports = nextConfig;
  