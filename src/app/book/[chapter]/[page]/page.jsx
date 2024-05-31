import { DEFAULT_PATH } from '../../data';
import { getMarkdown } from '../../getMarkdown';

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
