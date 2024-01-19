import { getPostDetail } from '@/utils/getPosts';
import { DEFAULT_PATH, TITLE, DESC } from '../data';

export async function generateMetadata({ params }, parent) {
  const { title } = await getPostDetail(DEFAULT_PATH, params.slug);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    metadataBase: new URL(`https://books.weniv.co.kr${DEFAULT_PATH}`),
    title: `${title ? title + ' | ' : ''} ${TITLE}`,
    openGraph: {
      type: 'website',
      title: `${title ? title + ' | ' : ''} ${TITLE}`,
      description: DESC,
      siteName: TITLE,
      images: [
        `https://books.weniv.co.kr/images${DEFAULT_PATH}/og.png`,
        ...previousImages,
      ],
    },
    twitter: {
      card: 'summary',
      title: `${title ? title + ' | ' : ''} ${TITLE}`,
      description: DESC,
      images: OGIMG,
    },
  };
}

export default async function Page({ params }) {
  const { title, htmlContent } = await getPostDetail(DEFAULT_PATH, params.slug);

  return (
    <>
      {htmlContent && (
        <>
          <h3 className="title">{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </>
      )}
    </>
  );
}
