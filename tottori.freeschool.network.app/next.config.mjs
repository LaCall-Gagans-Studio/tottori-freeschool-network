/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    },
    webpack: (config) => {
        if (!config.optimization.splitChunks) return config;
    
        config.optimization.splitChunks.maxSize = 20000000; // 20MB
        return config;
    },
}

export default nextConfig
