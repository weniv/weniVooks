import { getChapters } from '@/app/util_sub/getChapters';
import { getMarkdown } from '@/app/util_sub/getMarkdown';
import { CHAPTER_TITLE, DEFAULT_PATH, TITLE } from '../data';
import ChapterIndex from '@/components/sub/ChapterIndex';
import { getMenu } from '@/app/util_sub/getMenu';

export const dynamicParams = false;

export function generateStaticParams() {
  const data = getChapters();
  return data;
}

export default async function Page({ params }) {
  const isPage = Boolean(params.page);

  const { title, htmlContent } = await getMarkdown(
    `/${DEFAULT_PATH}/${params.chapter}.md`,
    isPage,
  );

  const menuData = getMenu(DEFAULT_PATH, TITLE, CHAPTER_TITLE);
  const menuList = menuData.sections.filter(
    (item) => item.link === `/${DEFAULT_PATH}/${params.chapter}`,
  );

  return (
    <main>
      {htmlContent ? (
        <>
          {/* 하위 메뉴 있을 때 md 파일 노출 */}
          <h3 className="title">{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </>
      ) : (
        <>
          {/* 하위 메뉴 있을 때 목차 노출 */}
          <h3 className="title">{CHAPTER_TITLE[params.chapter]}</h3>
          <div className="box list">
            <h4>목차</h4>
            <ChapterIndex menuList={menuList} />
          </div>
        </>
      )}
    </main>
  );
}
