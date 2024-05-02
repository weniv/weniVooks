import { getPostDetail } from '@/utils/getPosts';
import { DEFAULT_PATH, TITLE, DESC, OGIMG } from '../data';

export async function generateMetadata({ params }, parent) {
  const { title } = await getPostDetail(DEFAULT_PATH, params.slug);

  return {
    title: `${title ? title + ' | ' : ''} ${TITLE}`,
    openGraph: {
      type: 'website',
      title: `${title ? title + ' | ' : ''} ${TITLE}`,
      description: DESC,
      siteName: TITLE,
      images: [`/images${DEFAULT_PATH}/og.png`],
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
