/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  webpack: (config) => {
    if (config.optimization?.splitChunks) {
      config.optimization.splitChunks.maxSize = 20000000;
    }
    return config;
  },
};

module.exports = nextConfig;
