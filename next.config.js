/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/services/wenivooks',
  assetPrefix: '/services/wenivooks',
  trailingSlash: true,
  output: 'standalone', // Docker standalone 빌드

  // 정적 파일 서빙 설정 추가
  async rewrites() {
    return [
      {
        source: '/services/wenivooks/images/:path*',
        destination: '/images/:path*',
      },
      {
        source: '/services/wenivooks/pyscript/:path*',
        destination: '/pyscript/:path*',
      },
    ];
  },

  // 이미지 설정
  images: {
    unoptimized: true,
    domains: ['dev.wenivops.co.kr'],
  },
};

module.exports = nextConfig;