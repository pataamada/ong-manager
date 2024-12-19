/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  }, logging: {
    fetches: {
      fullUrl: true,
    },
  }, images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
    ],
  },
  images: {
    domains: ['firebasestorage.googleapis.com']
  },
};

export default nextConfig;

