import { getPostDetail } from '@/utils/getPosts';
import { DEFAULT_PATH, TITLE, DESC, OGIMG } from '../data';
import { JSDOM } from 'jsdom';
import Script from 'next/script';

function replacePreWithPyRepl(htmlString) {
  const dom = new JSDOM(htmlString);
  const preElements = dom.window.document.querySelectorAll(
    'div[data-rehype-pretty-code-fragment=""]',
  );

  preElements.forEach((el) => {
    const content = el.textContent;
    const pyReplElement = dom.window.document.createElement('py-repl');
    pyReplElement.textContent = content;
    const editorDiv = pyReplElement.querySelector('.cm-content');
    if (editorDiv) {
      editorDiv.setAttribute('data-language', 'python');
    }

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
  const replacedHtmlContent = replacePreWithPyRepl(htmlContent);

  return (
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
  );
}
