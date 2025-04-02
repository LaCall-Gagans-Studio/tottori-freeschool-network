/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  webpack: (config) => {
    if (config.optimization?.splitChunks) {
      config.optimization.splitChunks.maxSize = 500 * 1024; // 500KBに圧縮
      config.optimization.splitChunks.minSize = 10 * 1024;  // 最小でも10KB

      config.optimization.splitChunks.cacheGroups = {
        framework: {
          name: "framework",
          test: /[\\/]node_modules[\\/](react|react-dom|next|scheduler)[\\/]/,
          chunks: "all",
          priority: 40,
          enforce: true,
        },
        lib: {
          test(module) {
            return (
              module.size() > 160000 &&
              /node_modules[/\\]/.test(module.identifier())
            );
          },
          name(module) {
            const crypto = require("crypto");
            return crypto.createHash("sha1").update(module.identifier()).digest("hex").substring(0, 8);
          },
          priority: 30,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        commons: {
          name: "commons",
          minChunks: 2,
          priority: 20,
        },
        shared: {
          name: "shared",
          priority: 10,
          minChunks: 2,
          reuseExistingChunk: true,
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
