import type { Configuration } from 'webpack';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  webpack: (config: Configuration) => {
    if (config.optimization?.splitChunks) {
      config.optimization.splitChunks.maxSize = 20000000;
    }
    return config;
  },
});
