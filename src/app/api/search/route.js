import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import {
  parseMarkdown,
  splitArray,
  choiceBookKind,
  textNormalize,
} from '@/app/search/searchUtils';

const BASEURL = '_md';

// 재귀적으로 디렉토리를 순회하며 파일 목록을 가져오는 함수
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

  try {
    const searchParams = new URL(req.url).searchParams;
    const keyword = searchParams.get('keyword') || '';

    // data 디렉토리 내부의 .md 파일 및 하위 디렉토리의 .md 파일을 재귀적으로 읽어옴
    const mdFiles = getFiles(path.join(process.cwd(), BASEURL));

    // 파일과 경로 합치기
    const filePath = mdFiles.map((file) => {
      const match = file.match(/_md\\([^\\]+)/);

      const data = {
        url: match ? match[1] : null,
        fileName: file,
      };

      return data;
    });

    for (const file of filePath) {
      const wholeFiles = fs.readFileSync(file.fileName).toString();
      let filteredFiles;

      if (wholeFiles.toLowerCase().includes(keyword.toLowerCase())) {
        filteredFiles = wholeFiles;
      }

      let val = {
        url: file.url,
        file: filteredFiles,
      };

      if (val.file) {
        data.push(val);
      }
    }

    // 코드블럭, 인용문, alt 태그 삭제
    data.map((doc) => (doc.file = textNormalize(doc.file)));

    // HTML로 파싱
    data.map((doc) => {
      doc.file = parseMarkdown(doc.file);
    });

    // obj 형태로 변환
    const convertData = (dataList) => {
      const result = [];

      for (const data of dataList) {
        const url = choiceBookKind(data.url); // breadcrumb 첫 번째 요소, 책 종류
        const html = data.file;
        let mainTitle = ''; // breadcrumb 두 번째 요소, 메인 제목

        html.map((line) => {
          if (line.includes('title:')) {
            mainTitle = line
              .replace(/<[^>]*>/g, '')
              .replace(/title:\s*([\d.]+\s*)?/g, '')
              .trim();
          }
        });

        // title과 date 정보 삭제
        const filteredHtml = html.filter(
          (item) =>
            !item.includes('<p>---</p>') &&
            !item.includes('title:') &&
            !item.includes('date:'),
        );

        const outputArray = splitArray(filteredHtml, '<h2>');

        // 검색 키워드가 존재하는 챕터만 남기기
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
          // 키워드가 포함된 문자열만 남기기
          chapter.map((row) => {
            const condition = row.includes(keyword) && content.length < 3;
            while (condition) {
              content.push(row.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' '));
              break;
            }
          });

          if (content.length !== 0) {
            result.push({
              bookKind: url,
              mainTitle,
              title,
              content,
              link: '/',
            });
          }
        }
      }

      return result;
    };

    const output = convertData(data);

    return NextResponse.json(output);
  } catch (err) {
    console.log(err);
    return NextResponse.json('정보를 가져오는데 실패하였습니다');
  }
}
