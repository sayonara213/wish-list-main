/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/app',
        permanent: true,
      },
    ];
  },
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
