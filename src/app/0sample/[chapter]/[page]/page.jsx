import { getMarkdown } from '@/sub/getMarkdown';
import replaceCodeEditor from '@/sub/replaceCodeEditor';

import { getPages } from '@/sub/getPages';
import { DEFAULT_PATH, EDITOR } from '../../bookInfo';

// 컨텐츠 페이지
export default async function Page({ params }) {
  const chapter = params.chapter;
  const page = params.page;

  try {
    const { title, htmlContent } = await getMarkdown(
      `/${DEFAULT_PATH}/${chapter}/${page}.md`,
    );

    if (!EDITOR || EDITOR.length === 0) {
      return (
        <>
          <h3 className="title">{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </>
      );
    }
    if (EDITOR) {
      return (
        <>
          <h3 className="title">{title}</h3>
          {replaceCodeEditor(htmlContent, EDITOR)}
        </>
      );
    }
  } catch (error) {
    console.error('Error fetching markdown:', error);
    return (
      <div>현재 콘텐츠를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.</div>
    );
  }
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getPages(DEFAULT_PATH);
}
