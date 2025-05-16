/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/services/wenivooks',
  // assetPrefix: '/services/wenivooks',
  trailingSlash: true,
  output: 'standalone', // Docker standalone 빌드

  // 이미지 설정
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;