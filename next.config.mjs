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
};


export default nextConfig;

