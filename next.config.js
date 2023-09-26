/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    output: 'standalone',
    reactStrictMode: false,
    poweredByHeader: false,
    swcMinify: true,
}

module.exports = nextConfig
