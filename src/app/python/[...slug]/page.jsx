import Script from 'next/script';
import styles from './page.module.scss';
import { getPostDetail } from '@/utils/getPosts';
import Aside from '@/components/layouts/Aside';

export async function generateMetadata({ params }) {
  const post = await getPostDetail('/python', params.slug);
  const { title } = post;

  return {
    title: `${title ? title + ' | ' : ''} 파이썬 부트캠프`,
  };
}

export default async function Page({ params }) {
  const post = await getPostDetail('/python', params.slug);

  return (
    <div className={styles.container}>
      <main className={styles.bookContent}>
        {post.htmlContent && (
          <>
            <h3 className={styles.title}>{post.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
          </>
        )}
      </main>
      <Aside />
    </div>
  );
}
