export const DEFAULT_PATH = 'book';
export const TITLE = 'JavaScript Test';
export const DESC = '위니브의 다양한 교안을 웹에서 확인해보세요!';
export const OGIMG = [`/images/${DEFAULT_PATH}/og.png`];

export const CHAPTER_TITLE = {
  chapter01: '개발의 첫 걸음',
  chapter02: '더 견고하게 알아볼 HTML',
  chapter03: 'CSS',
  chapter04: '일단 글을 적고 꾸며보자!',
  chapter05: '일단 글을 적고 꾸며보자!',
  chapter06: '요소를 배치해보자!',
  chapter07: '그런데 좀 멋지게 배치할 수 없을까?',
};

export const META_DATA = {
  title: `${TITLE} | 위니북스`,
  description: DESC,
  openGraph: {
    type: 'website',
    title: `${TITLE} | 위니북스`,
    description: DESC,
    url: `https://books.weniv.co.kr/${DEFAULT_PATH}`,
    siteName: TITLE,
    images: OGIMG,
  },
};
