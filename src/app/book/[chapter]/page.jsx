import Link from 'next/link';
import { CHAPTER_TITLE, DEFAULT_PATH } from '../data';
import { getMenu } from '../getMenu';
import classNames from 'classnames';
export default async function Page({ params }) {
  const menuData = await getMenu(DEFAULT_PATH);

  const menuList = menuData.sections.filter(
    (item) => item.link === `/${DEFAULT_PATH}/${params.chapter}`,
  );

  return (
    <>
      <h3 className="title">{CHAPTER_TITLE[params.chapter]}</h3>

      <div className="box list">
        <h4>목차</h4>
        {menuList && (
          <ol>
            {menuList[0].sections.map((item, index) => (
              <li key={index}>
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}
