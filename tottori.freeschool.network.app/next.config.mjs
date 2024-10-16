// @type {import('next').NextConfig} 
const nextConfig = {
    output: `export`,
    experimental: {
        appDir: true, // 必要に応じて実験的機能を有効化
      },
      reactStrictMode: true, // リアクトの厳密モードを有効にする
}

export default nextConfig;
