export const DEFAULT_PATH = '/javascript';
export const TITLE = 'JavaScript 에센셜';
export const DESC =
  'JavaScript의 기초부터 심화까지 필수적인 내용을 담았습니다!';
export const OGIMG = [`/images${DEFAULT_PATH}/og.png`];
export const META_DATA = {
  title: `${TITLE} | 위니북스`,
  description: DESC,
  openGraph: {
    type: 'website',
    title: `${TITLE} | 위니북스`,
    description: DESC,
    url: `https://books.weniv.co.kr${DEFAULT_PATH}`,
    siteName: TITLE,
    images: OGIMG,
  },
};

// // 예시
// export const DEFAULT_PATH = "/wenivworld";
// export const TITLE = "위니브 월드(학생용)";
// export const DESC = "위니브월드로 떠나는 파이썬 코딩 여행";
// export const OGIMG = [`/images${DEFAULT_PATH}/og.png`];
// export const META_DATA = {
//   title: `${TITLE} | 위니북스`,
//   description: DESC,
//   openGraph: {
//     type: "website",
//     title: `${TITLE} | 위니북스`,
//     description: DESC,
//     url: `https://books.weniv.co.kr${DEFAULT_PATH}`,
//     siteName: TITLE,
//     images: OGIMG,
//   },
// };
