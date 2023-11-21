import '@/styles/subpage.scss';
import { getPostDetail } from '@/utils/getPosts';
import AsideWrap from '@/components/layouts/AsideWrap';

import { DEFAULT_PATH } from '../data';

export async function generateMetadata({ params }) {
  const post = await getPostDetail(DEFAULT_PATH, params.slug);
  const { title } = post;

  return {
    title: `${title ? title + ' | ' : ''} 위니브 월드`,
  };
}

export default async function Page({ params }) {
  const post = await getPostDetail(DEFAULT_PATH, params.slug);

  return (
    <div className="container">
      <main className="bookContent">
        <div className="inner">
          {post.htmlContent && (
            <>
              <h3 className="title">{post.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
            </>
          )}
        </div>
      </main>

      <AsideWrap />
    </div>
  );
}
