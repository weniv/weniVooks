import { DEFAULT_PATH } from '../../data';
import { getMarkdown } from '@/app/util_sub/getMarkdown';
import { getPages } from '@/app/util_sub/getPages';

export const dynamicParams = false;

export function generateStaticParams() {
  const data = getPages();
  return data;
}
export default async function Page({ params }) {
  const { title, htmlContent } = await getMarkdown(
    `/${DEFAULT_PATH}/${params.chapter}/${params.page}.md`,
  );

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
