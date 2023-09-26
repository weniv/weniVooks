import { Client } from '@notionhq/client';

async function getData() {
  const notion = new Client({
    auth: process.env.NOTION_KEY,
  });

  const pages = await notion.pages.retrieve({
    page_id: process.env.PAGE_ID,
  });
  const blocks = await notion.blocks.children.list({
    block_id: process.env.PAGE_ID,
  });

  return {
    props: {
      pages: pages,
      blocks: blocks,
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

export default async function NotionTest() {
  const data = await getData();
  const DBData = await getDBData();

  return (
    <>
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
