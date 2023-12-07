import '@/styles/subpage.scss';
import { getPostDetail } from '@/utils/getPosts';
import AsideWrap from '@/components/layouts/AsideWrap';

import { DEFAULT_PATH } from '../data';

export async function generateMetadata({ params }) {
  const post = await getPostDetail(DEFAULT_PATH, params.slug);
  const { title } = post;
  const url = params.slug.join('/');

  return {
    metadataBase: new URL(`https://books.weniv.co.kr${DEFAULT_PATH}`),
    title: `${title ? title + ' | ' : ''} 파이썬 부트캠프`,
    // openGraph: {
    //   type: 'website',
    //   title: `${title ? title + ' | ' : ''} 파이썬 부트캠프`,
    //   description: '위니브월드로 떠나는 파이썬 코딩 여행',
    //   url: `${url}`,
    //   siteName: '위니북스',
    //   // images: ['/images/wenivworld/cover-weniv-world-student.png'],
    // },
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
