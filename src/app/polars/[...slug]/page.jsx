import { getPostDetail } from '@/utils/getPosts';
import { DEFAULT_PATH, TITLE, DESC, OGIMG } from '../data';
import { JSDOM } from 'jsdom';
import Script from 'next/script';

const json = {
  packages: ['numpy', 'pandas'], // 추후 Polars 지원 여부 확인 후 추가
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
      {htmlContent && (
        <>
          <h3 className="title">{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: replacedHtmlContent }} />
        </>
      )}

      <link rel="stylesheet" href="/pyscript/pyscript.css" />
      <Script src="/pyscript/pyscript.js" />
      <py-config type="json">{JSON.stringify(json)}</py-config>
    </>
  );
}
