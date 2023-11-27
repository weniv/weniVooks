import puppeteer from 'puppeteer';
const Page = () => {
  // 1. 단순 실행 환경에 pdf 생성
  const generatePdf = async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.goto('https://google.com');
    await page.emulateMediaType('screen');
    const pdfBuffer = await page.pdf({ path: 'test.pdf', format: 'A4' });

    // // class downtest가 클릭하면 실행
    // await page.click('.downtest');

    await browser.close();
  };

  generatePdf();

  return (
    <>
      <button className="downtest">download</button>
      {/* <a href="/api/pdf" download="test.pdf">
        Download this as a PDF
      </a> */}
      <div>
        <h1>Generated PDF</h1>
        <p>This text will be in the PDF!</p>
      </div>
    </>
  );
};

export default Page;
