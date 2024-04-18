import { getPostDetail } from '@/utils/getPosts';
import { DEFAULT_PATH, TITLE, DESC } from '../data';
import { JSDOM } from 'jsdom';
import Script from 'next/script';
import '../../../../public/codeblocks/common.css';
import '../../../../public/codeblocks/codemirror.css';

function replaceCodeWithPyRepl(htmlString) {
  const dom = new JSDOM(htmlString);

  const codeElements = dom.window.document.querySelectorAll(
    'pre.weniv-light[data-language="javascript-exec"]',
  );

  let deleteElements = dom.window.document.querySelectorAll(
    'pre.weniv-dark[data-language="javascript-exec"]',
  );

  deleteElements.forEach((el) => {
    el.remove();
  });

  codeElements.forEach((el) => {
    const content = el.textContent;
    const jsReplElement = dom.window.document.createElement('js-repl');
    jsReplElement.textContent = content;
    el.replaceWith(jsReplElement);
  });

  return dom.serialize();
}

export async function generateMetadata({ params }, parent) {
  const { title } = await getPostDetail(DEFAULT_PATH, params.slug);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    metadataBase: new URL(`https://books.weniv.co.kr${DEFAULT_PATH}`),
    title: `${title ? title + ' | ' : ''} ${TITLE}`,
    openGraph: {
      type: 'website',
      title: `${title ? title + ' | ' : ''} ${TITLE}`,
      description: DESC,
      // url: `${url}`,
      siteName: TITLE,
      images: [`/images${DEFAULT_PATH}/og.png`, ...previousImages],
    },
  };
}

export default async function Page({ params }) {
  const { title, htmlContent } = await getPostDetail(DEFAULT_PATH, params.slug);
  const replacedHtmlContent = replaceCodeWithPyRepl(htmlContent);

  return (
    <>
      {htmlContent && (
        <>
          <h3 className="title">{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: replacedHtmlContent }} />
        </>
      )}
      <link rel="stylesheet" href="/codeblocks/codemirror.css" />
      <Script src="/codeblocks/codemirror.js" />
      <Script defer src="/codeblocks/javascript/js-repl.js" />
      <Script defer src="/codeblocks/codemirror.js" />
      <Script defer src="/codeblocks/javascript/javascript.js" />
      <Script defer src="/codeblocks/codemirror/active-line.js" />
    </>
  );
}
