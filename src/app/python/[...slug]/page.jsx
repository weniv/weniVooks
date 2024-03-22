import dynamic from 'next/dynamic';
import { getPostDetail } from '@/utils/getPosts';
import { DEFAULT_PATH, TITLE, DESC, OGIMG } from '../data';
import { JSDOM } from 'jsdom';
import Script from 'next/script';

function replaceCodeWithPyRepl(htmlString) {
  const dom = new JSDOM(htmlString);
  const codeElements = dom.window.document.querySelectorAll(
    'pre[class="weniv-light"]',
  );

  let deleteElements = dom.window.document.querySelectorAll(
    'pre[class="weniv-dark"]',
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

export async function generateMetadata({ params }, parent) {
  const { title } = await getPostDetail(DEFAULT_PATH, params.slug);

  return {
    title: `${title ? title + ' | ' : ''} ${TITLE}`,
    openGraph: {
      type: 'website',
      title: `${title ? title + ' | ' : ''} ${TITLE}`,
      description: DESC,
      siteName: TITLE,
      images: [`/images${DEFAULT_PATH}/og.png`],
    },
    twitter: {
      card: 'summary',
      title: `${title ? title + ' | ' : ''} ${TITLE}`,
      description: DESC,
      images: OGIMG,
    },
  };
}

export default async function Page({ params }) {
  const { title, htmlContent } = await getPostDetail(DEFAULT_PATH, params.slug);
  const replacedHtmlContent = replaceCodeWithPyRepl(htmlContent);

  return (
    <>
      {htmlContent ? (
        <>
          <link rel="stylesheet" href="/pyscript/pyscript.css" />
          <Script defer src="/pyscript/pyscript.js" />
          {htmlContent && (
            <>
              <h3 className="title">{title}</h3>
              <div dangerouslySetInnerHTML={{ __html: replacedHtmlContent }} />
            </>
          )}
        </>
      ) : (
        <>
          <p>문제 발생</p>
        </>
      )}
    </>
  );
}
