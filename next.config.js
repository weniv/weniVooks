/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/services/wenivooks',
  // assetPrefix: '/services/wenivooks',
  trailingSlash: true,
  // output: 'standalone', // Docker standalone 빌드
  // Edge Runtime 완전 비활성화
  experimental: {
    runtime: undefined,
    serverComponents: false,
  },
  // 이미지 설정
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;