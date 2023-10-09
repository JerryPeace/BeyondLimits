/** @type {import('next').NextConfig} */
// const { i18n } = require('./next-i18next.config');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
    },
  },
  reactStrictMode: false,
  experimental: {
    reactRoot: true,
  },
  swcMinify: true,
  // i18n,
  images: {
    domains: ['s3-ap-northeast-1.amazonaws.com', 'gitlab.com'],
    formats: ['image/avif', 'image/webp'],
  },
  output: 'standalone',
});
