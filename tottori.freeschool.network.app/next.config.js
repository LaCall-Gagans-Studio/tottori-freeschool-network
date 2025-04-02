/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  webpack: (config) => {
    if (config.optimization?.splitChunks) {
      config.optimization.splitChunks.maxSize = 2000000; // 2MB 分割
      config.optimization.splitChunks.minSize = 100000;  // 100KB 開始
      config.optimization.splitChunks.cacheGroups = {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
