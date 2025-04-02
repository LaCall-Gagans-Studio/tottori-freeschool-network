/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  experimental: {
    serverComponentsExternalPackages: [
      // Cloudflare側に送らず外部参照させる依存（重そうなやつ）
      "react-markdown",
      "gray-matter",
      "js-yaml",
      "firebase",
      "@octokit/rest",
      "leaflet",
      "react-leaflet",
    ],
  },
  webpack: (config) => {
    if (config.optimization?.splitChunks) {
      config.optimization.splitChunks.maxSize = 2 * 1024 * 1024; // 2MB
      config.optimization.splitChunks.minSize = 100 * 1024; // 100KB

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
