/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/services/wenivooks',
  // assetPrefix: '/services/wenivooks',
  trailingSlash: true,
  output: 'standalone', // Docker standalone 빌드

  // 정적 파일 서빙 설정 추가
  // 정적 파일 경로 재작성
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

  // 이미지 설정
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;