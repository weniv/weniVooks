export const DEFAULT_PATH = '/github'; // '/'로 시작해주세요 ex. '/python'
export const TITLE = '알잘딱깔센 GitHub 핵심개념';
export const DESC = '위니브의 다양한 교안을 웹에서 확인해보세요!';

export const OGIMG = [`/images${DEFAULT_PATH}/og.png`];
export const META_DATA = {
  title: `${TITLE} | 위니북스`,
  description: DESC,
  openGraph: {
    type: 'website',
    title: `${TITLE} | 위니북스`,
    description: DESC,
    url: `https://www.books.weniv.co.kr${DEFAULT_PATH}`,
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
