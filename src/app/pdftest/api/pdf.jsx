// 2. api handler로 fetch 요청 방식으로 pdf 생성 (진행중이던 코드 우선 중간 커밋)
import puppeteer from 'puppeteer';
import { NextApiHandler } from 'next';

const NextApiHandler = async (req, res) => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto('https://google.com');
  await page.emulateMediaType('screen');

  const pdfBuffer = await page.pdf({ format: 'A4' });
  // await page.pdf({
  //   path: 'test.pdf',
  //   format: 'A4',
  //   margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
  //   printBackground: true,
  // });

  res.send(pdfBuffer);

  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: path.resolve(__dirname, 'tmp'),
  });

  // class downtest가 클릭하면 실행
  // await page.click('.downtest');

  await browser.close();
};
