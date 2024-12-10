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
  },
  images: {
    domains: ['firebasestorage.googleapis.com']
  },
};

export default nextConfig;

