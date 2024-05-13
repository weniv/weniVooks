export const DEFAULT_PATH = '/basecamp-sql';
export const TITLE = 'SQL';
export const DESC = 'SQL';

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
