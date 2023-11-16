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

export async function GET(req) {
  const data = [];

  try {
    const searchParams = new URL(req.url).searchParams;
    const keyword = searchParams.get('keyword') || '';

    // data 디렉토리 내부 디렉토리 이름 가져오기 ex) python, react...
    const dirName = fs
      .readdirSync(path.join(process.cwd(), 'public/data'))
      .filter((dir) => path.extname(dir) === '');

    // 기본 경로
    const basePath = dirName.map((dir) =>
      path.join(process.cwd(), 'public/data/', dir),
    );

    // 파일과 경로 합치기
    const readFile = (files, idx) => {
      const filesList = fs.readdirSync(files);

      const result = filesList.map((file) => {
        const data = {
          url: basePath[idx].split('\\').pop(),
          fileName: path.join(basePath[idx], file),
        };

        return data;
      });

      return result;
    };

    // md 파일 경로 출력
    const filePath = basePath.map((files, idx) => readFile(files, idx));

    for (const dir of filePath) {
      for (const file of dir) {
        const wholeFiles = fs.readFileSync(file.fileName).toString();
        let filterdFiles;

        if (wholeFiles.toLowerCase().includes(keyword.toLowerCase())) {
          filterdFiles = wholeFiles;
        }

        let val = {
          url: file.url,
          file: filterdFiles,
        };

        if (val.file) {
          data.push(val);
        }
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
        const mainTitle = html.shift().replace(/<[^>]*>/g, ''); // breadCrumb 두번째 요소로 사용될 메인 제목
        const outputArray = splitArray(html, '<h2>');
        // 검색  keyword가 존재하는 챕터만 남기기
        const filteredChapter = outputArray.filter((subArray) =>
          subArray.some((item) => item.includes(keyword)),
        );
        for (const chapter of filteredChapter) {
          const title = chapter
            .shift()
            .replace(/<[^>]*>/g, '')
            .replace(/[0-9.]/g, '');
          const content = [];
          // keyword가 포함된 문자열만 남기기
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
            url,
          });
        }
      }

      return result;
    };

    const ouput = convertData(data);

    return NextResponse.json(ouput);
  } catch (err) {
    console.log(err);
    return NextResponse.json('Internal Server Error');
  }
}
