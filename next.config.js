/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/s2/**',
      },
      {
        protocol: 'https',
        hostname: 'ahnxdjsimhvpcnbeqzqo.supabase.co',
        port: '',
        pathname: '/storage/v1/**',
      },
    ],
  },
};

module.exports = nextConfig;
