/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Placeholder image domains can be added here once real product photography
    // is hosted (e.g. a CDN or Vercel Blob). Local /public paths need no entry.
    remotePatterns: [],
  },
};

module.exports = nextConfig;
