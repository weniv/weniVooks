export const DEFAULT_PATH = '/basecamp-network';
export const TITLE = 'HTML/CSS 베이스캠프';
export const DESC = '위니브의 다양한 교안을 웹에서 확인해보세요!';
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
