export const DEFAULT_PATH = '/wenivworld-teacher';
export const TITLE = '위니브 월드(선생님용)';
export const DESC = '위니브월드로 떠나는 파이썬 코딩 여행';

export const OGIMG = [
  `/images${DEFAULT_PATH}/og.png`,
  `/images/opengraph-image.png`,
];
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
  twitter: {
    card: 'summary',
    title: `${TITLE} | 위니북스`,
    description: DESC,
    images: OGIMG,
  },
};
