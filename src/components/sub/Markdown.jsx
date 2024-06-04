import { getMarkdown } from '@/app/util_sub/getMarkdown';

export default async function Markdown({ DEFAULT_PATH, params }) {
  const { title, htmlContent } = await getMarkdown(
    `/${DEFAULT_PATH}/${params.chapter}/${params.page}.md`,
  );

  if (htmlContent) {
    return (
      <>
        <h3 className="title">{title}</h3>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </>
    );
  }
  return null;
}
