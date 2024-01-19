export const DEFAULT_PATH = ''; // '/'로 시작해주세요 ex. '/python'
export const TITLE = '';
export const DESC = '';

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
