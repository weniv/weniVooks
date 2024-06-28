import { DEFAULT_PATH } from '../../data';
import { getMarkdown } from '@/sub/getMarkdown';
import { getPages } from '@/sub/getPages';
import replaceCodeEditor from '@/sub/replaceCodeEditor';

// 컨텐츠 페이지
export default async function Page({ params }) {
  try {
    const { title, htmlContent } = await getMarkdown(
      `/${DEFAULT_PATH}/${params.chapter}/${params.page}.md`,
    );
    const replacedCodeContent = replaceCodeEditor(htmlContent);

    return (
      <>
        <h3 className="title">{title}</h3>
        {replacedCodeContent}
      </>
    );
  } catch (error) {
    console.error('Error fetching markdown:', error);
    return (
      <div>현재 콘텐츠를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.</div>
    );
  }
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getPages();
}
