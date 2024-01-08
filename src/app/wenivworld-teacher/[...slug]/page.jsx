import { getPostDetail } from '@/utils/getPosts';
import { DEFAULT_PATH } from '../data';

export async function generateMetadata({ params }) {
  const { title } = await getPostDetail(DEFAULT_PATH, params.slug);

  return {
    title: `${title ? title + ' | ' : ''} 위니브 월드`,
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
