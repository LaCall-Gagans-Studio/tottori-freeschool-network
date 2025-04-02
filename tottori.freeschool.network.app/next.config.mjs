/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    },
    experimental: { reactMode: 'concurrent' }
}

export default nextConfig
