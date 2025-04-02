/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    },
    webpack: (config) => {
        config.optimization.splitChunks.maxSize = 20000000; // 20MB に分割
        return config;
    },
}

export default nextConfig

// next.config.js
