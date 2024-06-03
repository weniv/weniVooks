import Link from 'next/link';
import { CHAPTER_TITLE, DEFAULT_PATH } from '../data';
import { getMenu } from '../getMenu';
import { getMarkdown } from '../getMarkdown';

export default async function Page({ params }) {
  const { title, htmlContent } = await getMarkdown(
    `/${DEFAULT_PATH}/${params.chapter}.md`,
  );

  const menuData = await getMenu(DEFAULT_PATH);

  const menuList = menuData.sections.filter(
    (item) => item.link === `/${DEFAULT_PATH}/${params.chapter}`,
  );

  return (
    <>
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
            {menuList && (
              <ol>
                {menuList[0].sections?.map((item, index) => (
                  <li key={index}>
                    <Link href={item.link}>{item.title}</Link>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </>
      )}
    </>
  );
}
