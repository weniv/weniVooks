import Script from 'next/script';
import { getPages } from '@/sub/getPages';
import { getMarkdown } from '@/sub/getMarkdown';
import { DEFAULT_PATH, EDITOR } from '../../bookInfo';
import { JSDOM } from 'jsdom';

const json = {
  packages: ['numpy'],
};

function replaceCodeWithPyRepl(htmlString) {
  const dom = new JSDOM(htmlString);

  const codeElements = dom.window.document.querySelectorAll(
    'pre.weniv-light[data-language="python-exec"]',
  );

  let deleteElements = dom.window.document.querySelectorAll(
    'pre.weniv-dark[data-language="python-exec"]',
  );

  deleteElements.forEach((el) => {
    el.remove();
  });

  codeElements.forEach((el) => {
    const content = el.textContent;

    const pyReplElement = dom.window.document.createElement('py-repl');
    pyReplElement.textContent = content;
    el.replaceWith(pyReplElement);
  });

  return dom.serialize();
}

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
          <div
            dangerouslySetInnerHTML={{
              __html: replaceCodeWithPyRepl(htmlContent),
            }}
          />

          <link rel="stylesheet" href="/pyscript/pyscript.css" />
          <Script src="/pyscript/pyscript.js" />
          <py-config type="json">{JSON.stringify(json)}</py-config>
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
