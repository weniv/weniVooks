import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

async function getData() {
  const notion = new Client({
    auth: process.env.NOTION_KEY,
  });

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
  const notion = new Client({
    auth: process.env.NOTION_KEY,
  });

  const dbs = await notion.databases.retrieve({
    database_id: process.env.DB_ID,
  });

  return {
    dbs,
  };
}

async function getDataMd() {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  const n2m = new NotionToMarkdown({
    notionClient: notion,
    // // 옵션들
    // config: {
    //   separateChildPage: true,
    //   parseChildPages: false,
    // },
  });

  // 테스트용으로 10/10 회의록 내용을 출력
  const mdblocks = await n2m.pageToMarkdown(process.env.PAGE_ID_SAMPLE);
  const mdstring = n2m.toMarkdownString(mdblocks).parent;

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
        <h2>위니북스 notion to md</h2>
        <pre>{dataMd.mdstring}</pre>
      </div>
      <div>
        <h2>위니북스 Page 결과값</h2>
        <pre>{JSON.stringify(data, undefined, 2)}</pre>
      </div>
      <div>
        <h2>위니북스 DB 결과값</h2>
        <pre>{JSON.stringify(DBData, undefined, 2)}</pre>
      </div>
    </>
  );
}
