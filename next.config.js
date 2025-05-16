/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/services/wenivooks',
  // assetPrefix: process.env.NODE_ENV === 'dev' ? '/services/wenivooks' : '',
  trailingSlash: true,
  output: 'standalone', // Docker standalone 빌드

  // 이미지 설정
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;