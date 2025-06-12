/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  compress: false,
  /**
   * Set assetPrefix to our production domain so that assets are served from the correct path.
   * This is needed for deployments to a CDN.
   * In development, this is an empty string.
   */
  assetPrefix: isProd ? process.env.NEXT_PUBLIC_ASSET_PREFIX : '',
}

module.exports = nextConfig
