import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({ auth: process.env.NOTION_KEY });
const n2m = new NotionToMarkdown({
  notionClient: notion,
  // // 옵션들
  // config: {
  //   separateChildPage: true,
  //   parseChildPages: false,
  // },
});

// 파일 생성용 함수
async function createFile(props) {
  var fs = require('fs');
  fs.writeFile('./public/data/page_by_code.md', props, function (err) {
    if (err === null) {
      console.log('success');
    } else {
      console.log('fail', err);
    }
  });
}

async function getData() {
  const pages = await notion.pages.retrieve({
    page_id: process.env.PAGE_ID,
    // property_id:
  });
  const blocks = await notion.blocks.children.list({
    block_id: process.env.PAGE_ID,
  });

  return {
    props: {
      pages: pages,
      title: pages.properties.title.title,
      contents: blocks.results,
    },
  };
}

async function getDBData() {
  const dbs = await notion.databases.retrieve({
    database_id: process.env.DB_ID,
  });

  return {
    dbs,
  };
}

async function getDataMd() {
  // 테스트용으로 파이썬과 파이썬을 만든 사람들로 변경
  const mdblocks = await n2m.pageToMarkdown(process.env.PAGE_PY_01);
  const mdstring = n2m.toMarkdownString(mdblocks).parent;

  // 파일 생성함수 실행
  // await createFile(JSON.stringify(mdstring));

  return {
    mdstring,
  };
}

export default async function NotionTest() {
  const data = await getData();
  const DBData = await getDBData();
  const dataMd = await getDataMd();

  return (
    <>
      <div>
        <h2>테스트 페이지 to md</h2>
        <pre>{dataMd.mdstring}</pre>
      </div>
      <div>
        <h2>위니북스 Page 결과값</h2>
        <pre>{JSON.stringify(data, undefined, 2)}</pre>
      </div>
      {/* <div>
        <h2>위니북스 DB 결과값</h2>
        <pre>{JSON.stringify(DBData, undefined, 2)}</pre>
      </div> */}
    </>
  );
}
