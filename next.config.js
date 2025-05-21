/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/services/wenivooks',
  assetPrefix: '/services/wenivooks',
  trailingSlash: true,
  output: 'standalone', // Docker standalone 빌드
  // 이미지 최적화 설정 추가
  images: {
    domains: ['dev.wenivops.co.kr'],
    path: '/services/wenivooks/_next/image',
    unoptimized: true, // 필요한 경우 이미지 최적화 비활성화
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 클라이언트 빌드에서는 Node 모듈을 빈 객체로 처리
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
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
      {
        source: '/codeblocks/:path*',
        destination: '/services/wenivooks/codeblocks/:path*',
      },
      {
        source: '/theme/:path*',
        destination: '/services/wenivooks/theme/:path*',
      }
    ];
  },
};

module.exports = nextConfig;