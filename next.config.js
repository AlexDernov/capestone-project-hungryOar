/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.fineartamerica.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
    ],
  },
};

module.exports = nextConfig;

