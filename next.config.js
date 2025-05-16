/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/services/wenivooks',
  assetPrefix: '/services/wenivooks',
  trailingSlash: true,
  output: 'standalone', // Docker용 standalone 빌드
  experimental: {
    // 필요시 추가 설정
  }
};

module.exports = nextConfig;