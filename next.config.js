/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/services/wenivooks',
  assetPrefix: '/services/wenivooks',
  trailingSlash: true,
  output: 'standalone', // Docker standalone 빌드

  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: '/services/wenivooks/images/:path*',
      },
      {
        source: '/pyscript/:path*',
        destination: '/services/wenivooks/pyscript/:path*',
      },
    ];
  },
};

module.exports = nextConfig;