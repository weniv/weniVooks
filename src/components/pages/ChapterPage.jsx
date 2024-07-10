import ChapterIndex from '../sub/ChapterIndex';
import { getMenu } from '@/sub/getMenu';
import { getMarkdown } from '@/sub/getMarkdown';

export default async function ChapterPage({ TITLE, DEFAULT_PATH, chapter }) {
  const { title, htmlContent } = await getMarkdown(
    `/${DEFAULT_PATH}/${chapter}.md`,
    false,
  );

  const menuData = getMenu(DEFAULT_PATH, TITLE);
  const menuList = menuData.sections.filter(
    (item) => item.link === `/${DEFAULT_PATH}/${chapter}`,
  );

  const chapterTitle = menuData.sections.find(({ link }) =>
    link.includes(chapter),
  ).title;

  return (
    <div className="content__wrap">
      <main className="main">
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
    </div>
  );
}
