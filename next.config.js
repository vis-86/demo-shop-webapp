/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    output: 'standalone',
    reactStrictMode: false,
    poweredByHeader: false,
    swcMinify: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
}

module.exports = nextConfig
