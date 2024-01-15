import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import {
  parseMarkdown,
  splitArray,
  choiceBookKind,
  textNormalize,
  getRelativePath,
} from '@/app/search/searchUtils';

const BASEURL = '_md';

export const dynamic = 'force-dynamic';

function getFiles(dir) {
  const files = fs.readdirSync(dir);
  let fileList = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fileList = fileList.concat(getFiles(filePath));
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

export async function GET(req) {
  const data = [];
  const pageSize = 10;

  try {
    const searchParams = req.nextUrl.searchParams;

    const keyword = searchParams.get('keyword') || '';

    const mdFiles = getFiles(path.join(process.cwd(), BASEURL));

    const filePath = mdFiles.map((file) => {
      const match = file.match(/_md\/([^/]+)/);

      const data = {
        url: match ? match[1] : null,
        fileName: file,
      };

      return data;
    });

    for (const file of filePath) {
      const wholeFiles = fs.readFileSync(file.fileName).toString();
      let filteredFiles;

      if (wholeFiles.includes(keyword)) {
        filteredFiles = wholeFiles;
      }

      const absolutePath = `${process.cwd()}\\${BASEURL}`;
      const relativePath = getRelativePath(absolutePath, file.fileName);

      let val = {
        kind: file.url,
        link: relativePath,
        file: filteredFiles,
      };

      if (val.file) {
        data.push(val);
      }
    }

    data.map((doc) => (doc.file = textNormalize(doc.file)));
    data.map((doc) => {
      doc.file = parseMarkdown(doc.file);
    });

    const convertData = (dataList) => {
      const result = [];
      const page = parseInt(searchParams.get('page'), 10) || 1;

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      for (const data of dataList) {
        const bookKind = choiceBookKind(data.kind);
        const html = data.file;
        let mainTitle = '';

        html.map((line) => {
          if (line.includes('title:')) {
            mainTitle = line
              .replace(/<[^>]*>/g, '')
              .replace(/title:\s*([\d.]+\s*)?/g, '')
              .trim();
          }
        });

        const filteredHtml = html.filter(
          (item) =>
            !item.includes('<p>---</p>') &&
            !item.includes('title:') &&
            !item.includes('date:'),
        );

        const outputArray = splitArray(filteredHtml, '<h2>');
        const filteredChapter = outputArray.filter((subArray) =>
          subArray.some((item) => item.includes(keyword)),
        );

        for (const chapter of filteredChapter) {
          let title;
          const temp = chapter.shift();
          if (temp.includes('<h2>')) {
            title = temp.replace(/<[^>]*>/g, '').replace(/[0-9.]/g, '');
          } else {
            title = null;
          }

          const content = [];
          chapter.map((row) => {
            const condition = row.includes(keyword) && content.length < 3;
            while (condition) {
              content.push(row.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' '));
              break;
            }
          });

          if (content.length !== 0) {
            result.push({
              bookKind,
              mainTitle,
              title,
              content,
              link: `${data.link?.split('_md').pop()}`,
            });
          }
        }
      }

      // 페이지에 해당하는 결과만 추출
      const paginatedResult = result.slice(startIndex, endIndex);

      return {
        result: paginatedResult,
        resultLength: result.length,
        totalPages: Math.ceil(result.length / pageSize),
      };
    };

    const output = convertData(data);

    return NextResponse.json(output);
  } catch (err) {
    console.error(err);
    return NextResponse.json('정보를 가져오는데 실패하였습니다', {
      status: 500,
    });
  }
}
