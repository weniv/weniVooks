export const DEFAULT_PATH = '/python';
export const TITLE = '파이썬 부트캠프';
export const DESC = '위니브의 다양한 교안을 웹에서 확인해보세요!';

export const OGIMG = [`https://books.weniv.co.kr/images${DEFAULT_PATH}/og.png`];
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
