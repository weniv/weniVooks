import Script from 'next/script';
import { JSDOM } from 'jsdom';

import { getMarkdown } from '@/sub/getMarkdown';
import replaceCodeEditor from '@/sub/replaceCodeEditor';
import JavaScriptContent from './JavaScriptContent';

import PrintButton from './PrintButton';
import CopyButton from './CopyButton';
import dynamic from 'next/dynamic';

export default async function ContentPage({
  chapter,
  page,
  DEFAULT_PATH,
  EDITOR,
}) {
  try {
    const { title, htmlContent, markdownContent } = await getMarkdown(
      `/${DEFAULT_PATH}/${chapter}/${page}.md`,
    );

    if (!EDITOR || EDITOR.length === 0) {
      return (
        <>
          <CopyButton markdownContent={markdownContent} />
          <PrintButton />
          <h3 className="title">{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </>
      );
    } else if (EDITOR.includes('Python')) {
      return (
        <>
          <CopyButton markdownContent={markdownContent} />
          <PrintButton />
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
    } else if (EDITOR.includes('JavaScript')) {
      return (
        <JavaScriptContent
          htmlContent={htmlContent}
          title={title}
          markdownContent={markdownContent}
        />
      );
    } else {
      return (
        <>
          <CopyButton markdownContent={markdownContent} />
          <PrintButton />
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

const json = {
  packages: ['numpy', 'pandas', 'matplotlib', 'lxml'],
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
