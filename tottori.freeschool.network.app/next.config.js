/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  webpack: (config) => {
    if (config.optimization?.splitChunks) {
      config.optimization.splitChunks.maxSize = 2000000; // 2MB に分割
      config.optimization.splitChunks.minSize = 100000;  // 100KB から分割
    }
    return config;
  },
};

module.exports = nextConfig;
