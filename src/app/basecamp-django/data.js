export const DEFAULT_PATH = '/basecamp-django';
export const TITLE = 'Django 베이스캠프';
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
