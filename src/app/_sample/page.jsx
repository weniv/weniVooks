import { DEFAULT_PATH, DESCRIPTION, TITLE, OG_IMG, COVER } from './bookInfo';
import Image from 'next/image';

export async function generateMetadata(parent) {
  const IMG =
    `/images/${DEFAULT_PATH}/og.png` || (await parent).openGraph?.images;

  return {
    title: `${DEFAULT_PATH} | 위니북스`,
    description: DESCRIPTION,
    openGraph: {
      type: 'website',
      title: `${TITLE} | 위니북스`,
      url: `https://books.weniv.co.kr/${DEFAULT_PATH}`,
      siteName: TITLE,
      images: [IMG],
    },
  };
}
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { book: 'test' },
    { book: 'book' },
    { book: 'basecamp-html-css-test' },
  ];
}

// 교안 표지
export default function Home() {
  return (
    <div className="content__wrap">
      <main className="main">
        <h3 className="title">{TITLE}</h3>
        <Image
          src={COVER}
          alt=""
          className="cover"
          width={658}
          height={800}
          priority={true}
        />
      </main>
    </div>
  );
}
