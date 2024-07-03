import { DEFAULT_PATH, TITLE } from '../data';
import { getMenu } from '@/sub/getMenu';
import { getMarkdown } from '@/sub/getMarkdown';
import { getChapters } from '@/sub/getChapters';
import ChapterIndex from '@/components/sub/ChapterIndex';

// 챕터 페이지
export default async function ChapterPage({ params }) {
  const isPage = Boolean(params.page);

  const { title, htmlContent } = await getMarkdown(
    `/${DEFAULT_PATH}/${params.chapter}.md`,
    isPage,
  );

  const menuData = getMenu(DEFAULT_PATH, TITLE);
  const menuList = menuData.sections.filter(
    (item) => item.link === `/${DEFAULT_PATH}/${params.chapter}`,
  );

  const chapterTitle = menuData.sections.find(({ link }) =>
    link.includes(params.chapter),
  ).title;
  return (
    <main>
      {htmlContent ? (
        <>
          {/* 하위 메뉴 없을 때 md 파일 노출 */}
          <h3 className="title">{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </>
      ) : (
        <>
          {/* 하위 메뉴 있을 때 목차 노출 */}
          <h3 className="title">{chapterTitle}</h3>
          <div className="box list">
            <h4>목차</h4>
            <ChapterIndex menuList={menuList} />
          </div>
        </>
      )}
    </main>
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getChapters(DEFAULT_PATH);
}
