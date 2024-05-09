import { getPostDetail } from '@/utils/getPosts';
import { DEFAULT_PATH, TITLE, DESC } from '../data';
import { JSDOM } from 'jsdom';
import Script from 'next/script';
import './page.scss';

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

function replaceCodtWidthHTMLCSS(htmlString) {
  const dom = new JSDOM(htmlString);

  const codeElements = dom.window.document.querySelectorAll('.htmlPlay');
  if (codeElements) {
    codeElements.forEach((el) => {
      const html = el.querySelector('[data-language="html"]')?.textContent;
      const css = el.querySelector('[data-language="css"]')?.textContent;

      // 기존 코드 삭제
      let deleteElements = el.querySelectorAll(
        '[data-rehype-pretty-code-fragment]',
      );
      deleteElements.forEach((el) => {
        el.remove();
      });

      // 에디터 생성
      const htmlTextarea = dom.window.document.createElement('html-css');
      htmlTextarea.dataset.html = html ? html : '';
      htmlTextarea.dataset.css = css ? css : '';

      el.replaceWith(htmlTextarea);
    });
  }

  return dom.serialize();
}
export default async function Page({ params }) {
  const { title, htmlContent } = await getPostDetail(DEFAULT_PATH, params.slug);
  const replacedHtmlContent = replaceCodtWidthHTMLCSS(htmlContent);
  return (
    <>
      {htmlContent && (
        <>
          <h3 className="title">{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: replacedHtmlContent }} />
        </>
      )}

      <link rel="stylesheet" href="/codeblocks/codemirror.css" />
      <Script defer src="/codeblocks/codemirror.js" />

      <Script defer src="/codeblocks/htmlcss/xml.js" />
      <Script defer src="/codeblocks/htmlcss/css.js" />
      <Script defer src="/codeblocks/htmlcss/htmlcss-preview.js" />

      <Script defer src="/codeblocks/codemirror/active-line.js" />
    </>
  );
}
