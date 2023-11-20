import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import {
  parseMarkdown,
  removeImageAltTexts,
  removeAsideContent,
  splitArray,
  choiceBookKind,
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
      const data = {
        url: path.dirname(file).split(path.sep).pop(),
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

    data.map(
      (doc) => (doc.file = removeAsideContent(removeImageAltTexts(doc.file))),
    );

    // HTML로 파싱
    data.map((doc) => (doc.file = parseMarkdown(doc.file)));

    // obj 형태로 변환
    const convertData = (dataList) => {
      const result = [];

      for (const data of dataList) {
        const url = choiceBookKind(data.url);
        const html = data.file;
        const mainTitle = html.shift().replace(/<[^>]*>/g, ''); // breadcrumb 두 번째 요소로 사용될 메인 제목
        const outputArray = splitArray(html, '<h2>');
        // 검색 키워드가 존재하는 챕터만 남기기
        const filteredChapter = outputArray.filter((subArray) =>
          subArray.some((item) => item.includes(keyword)),
        );
        for (const chapter of filteredChapter) {
          const title = chapter
            .shift()
            .replace(/<[^>]*>/g, '')
            .replace(/[0-9.]/g, '');
          const content = [];
          // 키워드가 포함된 문자열만 남기기
          chapter.map((row) => {
            if (row.includes(keyword)) {
              content.push(row.replace(/<[^>]*>/g, ''));
            }
          });
          result.push({
            bookKind: url,
            mainTitle,
            title,
            content,
            link: '/',
          });
        }
      }

      return result;
    };

    const output = convertData(data);

    return NextResponse.json(output);
  } catch (err) {
    console.log(err);
    return NextResponse.json('Internal Server Error');
  }
}
