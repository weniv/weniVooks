import '@/styles/subpage.scss';
import { getPostDetail } from '@/utils/getPosts';
import AsideWrap from '@/components/layouts/aside/AsideWrap';

import { DEFAULT_PATH } from '../data';
import BtnCopy from '@/components/common/button/BtnCopy';

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
              <BtnCopy />
            </>
          )}
        </div>
      </main>

      <AsideWrap />
    </div>
  );
}
